import  fsp  from 'fs/promises'
import { json } from 'stream/consumers'

const controller = async(request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`)
    const { method } = request
    const { pathname } = url
    const pathElement = pathname.split('/').filter(e => e != '')
    let posts = []
    let data
    const postDataFile = await fsp.readFile('data/post.json', {encoding: 'utf8'})
    if (postDataFile) {
        posts = JSON.parse(postDataFile)
    }
    switch(method) {
        case 'GET':
            if(pathElement[1]) {
                let post = posts.find(e => e.id = pathElement[1])
                if(!post) {
                    response.writeHead(404)
                    return response.end("Post non trouvé dans l'archive")
                } else {
                    response.writeHead(200)
                    return response.end(JSON.stringify(post))
                }
            }
            response.writeHead(200)
            return response.end(JSON.stringify(posts))

        case 'POST':
            data = await json(request)
            if(posts.find(e => e.id == data.id)) {
                response.writeHead(400)
                return response.end("Id de post déjà présent en DB")
            }
            posts.push(data)
            let fileData = JSON.stringify(posts, null, 2)
            await fsp.writeFile('data/post.json',fileData)
            response.writeHead(201)
            return response.end("Ajout du post terminé")

        case 'PUT':
            data = await json(request)
            let postIndx = posts.indexOf(posts.find(e => e.id == data.id))
            let putData = JSON.stringify(posts, null, 2)
            await fsp.writeFile('data/post.json',putData)
            if(postIndx != -1) {
                posts.splice(postIndx, -1, data)
                response.writeHead(201)
                return response.end("Post mis à jour")
            }
            response.writeHead(404)
            return response.end("Post non présent en DB, màj impossible")
        
        case 'DELETE' : 
            console.log(pathElement[1])
            if(pathElement[1]) {
                let post = posts.find(e => e.id == pathElement[1])
                if(!post) {
                    response.writeHead(404)
                    return response.end("Id non trouvé en DB, suppression impossible")
                }
                posts = posts.filter(post => post.id != pathElement[1])
                let fileData = JSON.stringify(posts, null, 2)
                await fsp.writeFile('data/post.json',fileData)
                response.writeHead(204)
                return response.end("Post supprimé de la DB")
                
            }
            response.writeHead(400)
            return response.end("Pas d'id de post en URL")
        
        default :
            response.writeHead(404)
            return response.end("Méthode inconnue")
    }
}

export {
    controller as postController
}