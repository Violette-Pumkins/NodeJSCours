import  fsp  from 'fs/promises'
import { json } from 'stream/consumers'

const controller = async (request, response) => {
    //on recup l'URL de la requête
    const url = new URL(request.url, `http://${request.headers.host}`)
    //la synthaxe const { a } = obj - permet de récupérer dans une constance l'attribut 'a' de l'objet 'obj'
    // On va pouvoir récupérer la méthode (GET / PUT / PATCH / DELETE ... ) d'appel à notre url grâce à l'attribut 'method' de 'request'
    const { method } = request
    // On récupère les const pathname et searchParams de l'ojet URL
    const { pathname, searchParams } = url
//console.log(method)
    // Je vais chercher mon chemin depuis le pathname en créant un tableau qui va séparer les éléments de mon URL sur le caractère ("/") 
    const pathElement = pathname.split('/').filter(e => e != '')
    // NOTE : En faisant des refresh du navigateur, la méthode d'appel sera toujours GET

    // Je vais avoir besoin de ma liste d'utilisateurs dans le fichier quelque soit la méthode
    // j'init un tab vide de users
    let users = []
    let data
    const userDataFile = await fsp.readFile('data/user.json', {encoding: 'utf8'})
    // Si j'ai déjà des données, j'utilise comme tableau de users
    if (userDataFile) {
        users = JSON.parse(userDataFile)
    }

    switch(method) {
        
        case 'GET':
            let user
            // Si ID dans l'URL, je vais chercher le 'user' correspondant
            if (pathElement[1]) {
                user = users.find(e => e.id == pathElement[1])
                // Si le name est entré en filtre je cherche le 'user' correspondant
            } else if (searchParams.get('name')) {
                user = users.find(e=> e.name == searchParams.get('name'))                     
            } else {
                // sinon je renvoie la liste des users
                response.writeHead(200)
                return response.end(JSON.stringify(users))
            }
            // Si recher par id ou filtrée , je renvoie un user spécifique
            if(!user) {
                // Si je ne l'ai pas trouvé par id ou par filtre, je renvoie une erreur
                response.writeHead(404)
                return response.end("Cet utilisateur n'existe pas en DB")
            } else {
                // Sinon je renvoie l'élément
                response.writeHead(200)
                return response.end(JSON.stringify(user))
            }

            break
    // Pour les requêtes en POST utilisez un utilitaire comme REST Client sur VSCODE ou postman / insomnia ...
    // Si vous utilisez l'extension REST Client, voir la doc pour créer le fichier test-rest.http nécessaire au lancement des requêtes
    // Pour envoyer une requête depuis le fichier, il faut cliquer sur 'Send Request' au dessus de la déclaration de la requête
        case 'POST' :
            
            
            // je récupère les users déjà dans mon fichier - Il faut spécifier l'encodage en Lecture (UTF8 par défault en écriture)
            // sur une requête post, je récupère le body de la requête en JSON 
            data = await json(request)

            // Si l'utilisateur est déjà dans ma DB, je renvoie un message d'erreur
            if(users.find(user => user.id == data.id)) {
                response.writeHead(409)
                const res = JSON.stringify({message: "l'utilisateur existe déjà"})
                return response.end(res)
            }
            // push les données du post dans le tab
            users.push(data)
            // je stringify mon tableau de users
            let fileData = JSON.stringify(users, null, 2)
            // j'écris les données récupérées dans un fichier
            await fsp.writeFile('data/user.json', fileData)
            // je crée la réponse
            const res = {
                message : "ajout de l'utilisateur réussi",
                data : data
            }
            const payload = JSON.stringify(res)
            // je renvoie la réponse
            response.end(payload)
            break
        //Mettre à jour un user
        case 'PUT':
            data = await json(request)
            // Je cherche un user avec le même id en db
            let userIdx = users.indexOf(users.find(e => e.id == data.id))
            // S'il ne trouve pas d'index dans mon tableau de 'users', la méthode renvoie '-1'
            if (userIdx != -1) {
                // si j'ai trouvé je le remplace dans le tableau par le nouveau
                users.splice(userIdx, 1, data)
                // je renvoie une réponse ok
                response.writeHead(201)
                // Comme en POST, je réécris dans mon fichier JSON
                let fileData = JSON.stringify(users, null, 2)
                await fsp.writeFile('data/user.json', fileData)
                const res = {
                    message : "Mise à jour de l'utilisateur réussie",
                    data : data
                }
                const payload = JSON.stringify(res)
                return response.end(payload)
                
            } else {
                response.writeHead(404)
                response.end("Utilisateur non présent en DB, impossible de mettre à jour")
                return
            }
        //Supprimer un utilisateur
        case 'DELETE':
            // Si j'ai un élément [1] dans pathElement, ça veut dire que j'ai mis un ID dans l'URL de la requête
            if (pathElement[1]) {
                // S'il n'est pas dans ma DB je renvoie une erreur
                if(!users.find(e => e.id == pathElement[1])) {
                    response.writeHead(404)
                    return response.end("Impossible de supprimer cet utilisateur, il n'existe pas en DB")
                }
                // S'il existe, je vais chercher tous mes USERS sauf celui qui doit être supprimer
                users = users.filter(user => user.id != pathElement[1])
                // J'enregistre mon nouveau tableau (cf PUT et POST)
                let fileData = JSON.stringify(users, null, 2)
                response.writeHead(204)
                await fsp.writeFile('data/user.json', fileData)
                const res = {
                    message : "Suppression de l'utilisateur ok",
                    data : data
                }
                const payload = JSON.stringify(res)
                response.end(payload)
            }
            break

        default :
            response.end('Endpoint inconnu')
            break
        }
}

export {
    controller as userController
}