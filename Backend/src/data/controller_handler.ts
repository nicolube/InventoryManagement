import { Express, Request, Response } from 'express';
import { userController } from "./controller/user_controller"
import { authController, tokenHash } from "./controller/auth_controller"
import { models } from './database_manager';
import { itemController } from './controller/item_controller';

export interface Controller {
    path: string,
    secured: boolean,
    permission?: string | {
        post: string,
        get: string,
        put: string,
    }
    onPost?(req: Request, res: Response): void
    onGet?(req: Request, res: Response): void
    onPut?(req: Request, res: Response): void
    onDelete?(req: Request, res: Response): void
}

interface ControllerExt extends Controller {
    pathEx?: string
    permissionRegEx?: string | {
        post: string,
        get: string,
        put: string,
    }
}

type REQUEST_TYPE = "GET" | "PUT" | "POST" | "DELETE"
declare global {
    namespace Express {
        interface Request {
            user: any
        }
    }
}


const controllers = [
    authController,
    userController,
    itemController
]

function getController(path: string): Controller | undefined {
    return controllers.find(c => path.match(c.path)?.length)
}

export function init(app: Express) {
    app.put("/*", async (req, res) => {
        await handleRequest("PUT", req, res)
    })
    app.get("/*", async (req, res) => {
        await handleRequest("GET", req, res)
    })
    app.post("/*", async (req, res) => {
        await handleRequest("POST", req, res)
    })
    app.delete("/*", async (req, res) => {
        await handleRequest("DELETE", req, res)
    })
}

async function handleAuthentication(req: Request): Promise<boolean> {
    if (req.token) {
        let model = await models.session_key.findOne({
            key: tokenHash.copy().update(req.token).digest('hex')
        })
        if (model) {
            req.user = model
            return true
        }
    }
    return false
}

async function handleRequest(reqType: REQUEST_TYPE, req: Request, res: Response) {
    console.log(req.path)
    var controller = getController(req.path)
    if (controller?.secured) {
        if (!await handleAuthentication(req)) {
            res.status(401).send()
            return
        }
    }
    switch (reqType) {
        case "GET":
            if (controller?.onGet) {
                controller.onGet(req, res)
                return
            }
            break
        case "POST":
            if (controller?.onPost) {
                controller.onPost(req, res)
                return
            }
            break
        case "PUT":
            if (controller?.onPut) {
                controller.onPut(req, res)
                return
            }
            break
        case "DELETE":
            if (controller?.onDelete) {
                controller.onDelete(req, res)
                return
            }
            break
    }
    res.status(404).send()
}