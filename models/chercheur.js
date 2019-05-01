const mongoose = require('mongoose');


const chercheurShema = new mongoose.Schema({
    name: { type: String, required: true },
    originalLastName: { type: String},
    birthdate: { type: String, required: true },
    birthLocation: { type: String, required: true },
    sexe: { type: String, required: true },
    cin: { type: String},
    passeport: { type: String},
    grade: { type: String, required: true },
    etablissement: { type: String, required: true },
    tel: { type: String, required: true },
    email: { type: String, required: true },
    lastDiplome: { type: String, required: true },
    diplomeDate: { type: String, required: true },
    diplomeEtablissement: { type: String, required: true },

    denominationLR: { type: String, required: true, },
    responsableLR: { type: String, required: true, },
    etablissementStep2: { type: String, required: true, },
    universityStep2: { type: String, required: true, },


    sujetDeRecherche: { type: String, required: true, },
    tauxdavancement: { type: String, required: true, },
    firstYearInscription: { type: String, required: true, },
    universityStep3: { type: String, required: true, },
    nameDirecteurThese: { type: String, required: true, },
    signatureChercheur : { type: String  },


})

module.exports = mongoose.model('Chercheur', chercheurShema);