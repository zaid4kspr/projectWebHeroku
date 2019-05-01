const mongoose = require('mongoose');


const chercheurShema = new mongoose.Schema({
    name: { type: String, },
    originalLastName: { type: String },
    birthdate: { type: String, },
    birthLocation: { type: String, },
    sexe: { type: String, },
    cin: { type: String },
    passeport: { type: String },
    grade: { type: String, },
    etablissement: { type: String, },
    tel: { type: String, },
    email: { type: String, },
    lastDiplome: { type: String, },
    diplomeDate: { type: String, },
    diplomeEtablissement: { type: String, },

    denominationLR: { type: String, },
    responsableLR: { type: String, },
    etablissementStep2: { type: String, },
    universityStep2: { type: String, },


    sujetDeRecherche: { type: String, },
    tauxdavancement: { type: String, },
    firstYearInscription: { type: String, },
    universityStep3: { type: String, },
    nameDirecteurThese: { type: String, },
    signatureChercheur: { type: String },


})

module.exports = mongoose.model('Chercheur', chercheurShema);