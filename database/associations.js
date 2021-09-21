const Post = require('./models/Post')
const User = require('./models/User')
const Address = require('./models/Address')


/**  uno a uno, 1:1
 * belosngsTo: crea una columna en si mismo con referencia a la FK de otra tabla
 * hasOne: crea una columna en la tabla que le pertenece, escribiendo en ella su FK
 * 
 * Si la columna de relacion tiene el mismo nombre en los dos,
 * solo se crea una
 */
  
User.hasOne(Address, {
  // hasOne: 
  //   crea una columna en la tabla que le pertenece, 
  //   escribiendo en ella su FK
  as: 'domicilio', // referente a la tabla adresses
  foreignKey: 'residentId', // nombre de columna con FK
  onDelete: 'CASCADE', hooks: true,

})
Address.belongsTo(User, {
  // belosngsTo: 
  //   crea una columna en si mismo 
  //   con referencia a la FK de otra tabla
  as: 'residente', // referente a la tabla users
  foreignKey: 'residentId', // nombre de columna con FK
  foreignKeyConstraint: true,
  onDelete: 'CASCADE', hooks: true,
})



/** uno a muchos, 1:N, un usuario puede tener 0 o mas posts
 * 
 * 
*/
Post.belongsTo(User,{ // columna aparecerá en posts
  as: "author", // nombre con el que aparece en post.data
  // foreignKey: "authorId" // columna asociadora en Post
})
User.hasMany(Post,{
  as: "publications", // nombre que aparece en user.data
  foreignKey: "authorId" // columna asociadora en Post
})