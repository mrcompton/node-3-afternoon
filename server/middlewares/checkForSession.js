//req is the express way of accessing 'app' outside of index.js
module.exports = function(req, res, next){
    const {session} = req
    
    if(!session.user){
       session.user = {username: '', cart: [], total: 0}  
    } 
    next()
    
}