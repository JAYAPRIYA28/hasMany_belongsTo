module.exports = (sequelize, DataTypes) => {
    const userContent = sequelize.define("userContent",{
        username: {
            type: DataTypes.STRING
        },
            password: {
                type: DataTypes.STRING
            }
 
    },{
        timestamps: false 
    });

    const postContent = sequelize.define("postContent", {
        message: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });

    userContent.hasMany(postContent);
    postContent.belongsTo(userContent);

    let User, Posts;
    sequelize.sync({ alter: true}).then(()=> {

        // userContent.bulkCreate([
        //     {
        //       username:"jaii",
        //       password: "jaii"  
        //     },
        //     {
        //         username: "hello",
        //         password: "hello"
        //     },{
        //         username: "charmy",
        //         password: "charmy"
        //     },{
        //         username: "puppy",
        //         password: "puppy"
        //     }
        // ]);

        // postContent.bulkCreate([
        //     {
        //         message: "hii"
        //     },{
        //         message: "hello"
        //     },{
        //         message: "first"
        //     },{
        //         message:"message"
        //     }
        // ])

        return userContent.findOne({where: {username: "jaii"}});

    })
    .then((data)=> {
      User = data;

    //   return postContent.findAll();
     return postContent.findOne();
    }).then((data)=> {
        Posts = data;
        // return User.countPostContents(Posts)
        return User.removePostContent(Posts)
    }).then((data)=> {
        console.log(data);
    })
    .catch(err=>{
        console.log(err);
    }) 

    return userContent, postContent;
} 