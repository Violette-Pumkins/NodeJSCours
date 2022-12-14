//Installer node js
// Si version > , lancer depuis le terminal npm --watch server.js => permet d'actualiser en direct les changements dans le code

// Création d'une API
// Doc utilisée : https://devdocs.io/node/child_process

//Création du serveur
// dans l'invite de commande : npm init

// import de modules - ajouter la ligne "type" : "module" dans package.json
import  fsp  from 'fs/promises'
import { createReadStream } from 'node:fs'
import http from 'node:http'
import { json } from 'stream/consumers'

// le mot clé async a été ajouté car on utilise 'await' plus loin, la méthode doit donc être asynchrone
const server = http.createServer(async (request, response) => {
    //createServer fournit un objet  'request'   - Il faut actualiser le navigateur pour le voir apparaître
//console.log(request)     
    //on recup l'URL de la requête
    const url = new URL(request.url, `http://${request.headers.host}`)
    //la synthaxe const { a } = obj - permet de récupérer dans une constance l'attribut 'a' de l'objet 'obj'
    // On va pouvoir récupérer la méthode (GET / PUT / PATCH / DELETE ... ) d'appel à notre url grâce à l'attribut 'method' de 'request'
    const { method } = request
    // On récupère les const pathname et searchParams de l'ojet URL
    const { pathname, searchParams } = url
//console.log(method)

    // NOTE : En faisant des refresh du navigateur, la méthode d'appel sera toujours GET
    
    // Si je GET sans pathname ou sur le pathname index.html, je renvoie un fichier html à la place
    if (method == 'GET' && (pathname == '/' || pathname == '/index.html')) {
        const sendFile = createReadStream('views/index.html')
        sendFile.pipe(response)
        return
    }
    /*
    // Je regarde si ma requête est en GET sur l'URL '/user'
    if (method == 'GET' && pathname == '/user') {
        // Si des filtres sont ajoutés dans l'url ex : 'localhost:3000/user&name='charles' on ne renvoie que les résultats correspondants
        if (searchParams.get('name')) {
            response.end("Je renvoie l'utilisateur " + searchParams.get('name'))
            return
        }
        //Si pas de filtre, je renvoie tous les 'users'
        response.end('Je renvoie tous les users')

        //Tester les différents cas de figures en changeant l'URL du navigateur
    }

    if (method == 'GET' && pathname == '/post') {
        response.end('Je renvoie les posts')
    }
    /* */

    if(pathname == '/user') {
        switch(method) {
            case 'GET':
                if (searchParams.get('name')) {
                    response.end("Je renvoie l'utilisateur " + searchParams.get('name'))
                } else {
                    response.end('Je renvoie tous les users')
                }
                break
        // Pour les requêtes en POST utilisez un utilitaire comme REST Client sur VSCODE ou postman / insomnia ...
        // Si vous utilisez l'extension REST Client, voir la doc pour créer le fichier test-rest.http nécessaire au lancement des requêtes
        // Pour envoyer une requête depuis le fichier, il faut cliquer sur 'Send Request' au dessus de la déclaration de la requête
            case 'POST' :
                // j'init un tab vide de users
                let users = []
             
                // je récupère les users déjà dans mon fichier - Il faut spécifier l'encodage en Lecture (UTF8 par défault en écriture)
                const userDataFile = await fsp.readFile('data/user.json', {encoding: 'utf8'})
                // Si j'ai déjà des données, j'utilise comme tableau de users
                if (userDataFile) {
                    users = JSON.parse(userDataFile)
                }
                // sur une requête post, je récupère le body de la requête en JSON 
                const data = await json(request)

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
            default :
                response.end('Endpoint inconnu')
                break
        }
    } else {
        response.end('Server live') 
    }
})


// On lance le serveur sur le port 3000  - On peut aller voir dans le navigateur localhost:3000 et voir le message 'Server Live' - la console affiche 'server listen 3000'
server.listen(3000, () => {
    console.log('server listen 3000')
})

