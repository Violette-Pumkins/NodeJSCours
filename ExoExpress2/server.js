//Installer node js
// Si version > , lancer depuis le terminal npm --watch server.js => permet d'actualiser en direct les changements dans le code

// Création d'une API
// Doc utilisée : https://devdocs.io/node/child_process

//Création du serveur
// dans l'invite de commande : npm init

// import de modules - ajouter la ligne "type" : "module" dans package.json
import { createReadStream } from 'node:fs'
import http from 'node:http'
import { postController } from './controllers/post.controller.js'
import { userController } from './controllers/user.controller.js'

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
    // Je vais chercher mon chemin depuis le pathname en créant un tableau qui va séparer les éléments de mon URL sur le caractère ("/") 
    const pathElement = pathname.split('/').filter(e => e != '')
    // NOTE : En faisant des refresh du navigateur, la méthode d'appel sera toujours GET
    
    // Si je GET sans pathname ou sur le pathname index.html, je renvoie un fichier html à la place
    if (method == 'GET' && (pathname == '/' || pathname == '/index.html')) {
        const sendFile = createReadStream('views/index.html')
        sendFile.pipe(response)
        return
    }

    switch(pathElement[0]) {
        case 'user':
            userController(request, response)
            break
        case 'post':
            postController(request, response)
            break
        default :
        response.end('Chemin inconnu') 
    }
})


// On lance le serveur sur le port 3000  - On peut aller voir dans le navigateur localhost:3000 et voir le message 'Server Live' - la console affiche 'server listen 3000'
server.listen(3000, () => {
    console.log('server listen 3000')
})

