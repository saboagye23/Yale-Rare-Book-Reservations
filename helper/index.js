const { Book, Reservation, User } = require('../models');
class QueryHelper {
    async get_reserved_books(req){
        let reservedBooks = [];
        try{
            if(req.session.viewer !==undefined && req.session.viewer.id !== undefined){
                const reservedData = await Reservation.findAll({
                    where:{user_id: req.session.viewer.id || null},
                    attributes: ['id', 'notes', 'start_date', 'end_date'],
                    include:[
                        {
                            model: Book,
                            attributes: ['id', 'title', 'description', 'url', 'image_link', 'search_id']
                        },{
                            model: User,
                            attributes:['id', 'full_name']
                        }
                    ]
                }); 
                if(reservedData){
                    reservedData.forEach(reservation =>{
                        reservedBooks.push(reservation.dataValues);
                    })
                }
            }
        }catch(err){
            console.error(err);
        }
        return reservedBooks
    }
}

module.exports  = new QueryHelper();