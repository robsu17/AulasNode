import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'


// GET, POST, PUT, PATCH, DELETE

// GET => Buscar uma recurso do back-end
// POST => Criar uma recurso no back-end 
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação única específica de um recurso no back-end
// DELETE => Deletar um recurso no back-end

// GET/users => Buscando usuários no back-end
// POST/users => Criando usuários no back-end

// Stateful - Stateless 

// JSON - JavaScript Object Notation

// Cabeçalhos (requisição/resposta) => Metadados



const server = http.createServer(async (req, res) => { 
  const { method, url } = req

  // middleware
  await json(req, res)

  const route = routes.find(route => {
    return route.method == method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)
    
    const { query, ...params } = routeParams.groups
    req.params = params
    req.query = query ? extractQueryParams(query) : {}
   
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)