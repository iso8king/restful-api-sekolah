import kelasService from "../service/kelas-service.js";

const create = async(req,res,next)=>{
    try {
        const request = req.body;
        const result = await kelasService.create(request);

        res.status(200).json({
            data : result
        })
        
    } catch (e) {
        next(e)     
    }
}

const remove = async(req,res,next)=>{
    try {
        const request = req.body;
        const result = await kelasService.remove(request);
        res.status(200).json({
            data : "OK"
        })
        
    } catch (e) {
        next(e)     
    }
}

const get = async(req,res,next)=>{
    try {
        const request = req.query.nama;
        const result = await kelasService.get(request);

        res.status(200).json({
            data : result
        })
        
    } catch (e) {
      next(e)  
    }
}


export default{
    create,remove,get
}