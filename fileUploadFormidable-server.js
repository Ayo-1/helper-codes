
    const form = new formidable.IncomingForm(); 
    form.parse(req, function(err, fields, files){
        var __parentDir = "/home/serverhome/domain.com/public/"
        var oldPath = files.profile_pic.path; 
        var newPath = __parentDir + "uploads" + '/'+req.user.id + files.profile_pic.name 
        var rawData = fs.readFileSync(oldPath) 
      
        fs.writeFile(newPath, rawData, function(err){ 
            if(err) {res.json({error: "there was an error", err})}
            
               else{
                  
              if(req.user.role == "investor"){
        models.investor.update({firstName: fields.fname, lastName: fields.lname, phone: fields.phone, img_url: "/uploads/"+req.user.id + files.profile_pic.name }, {where: {id: req.user.id}}).then(inv => {
            models.profile_investor.create({investor_id: req.user.id, state: fields.state, lg: fields.lg, address: fields.address, role: fields.role}).then(prf_inv => {
                res.json({message: "Details added sucessfully", path: "/investor/dashboard", fields}); 
            })
        })
        }
        else if(req.user.role == "user"){
          models.user.update({firstName: fields.fname, lastName: fields.lname, phone: fields.phone, img_url: "/uploads/" + req.user.id + files.profile_pic.name }, {where: {id: req.user.id}}).then(user => {
            models.profile_user.create({userid: req.user.id, state: fields.state, lg: fields.lg, address: fields.address, role: fields.role}).then(prf_usr => {
                res.json({message: "Details added sucessfully", path: "/dashboard", fields}); 
            })
        })  
        }
        
               }
        }) 
  }) 
