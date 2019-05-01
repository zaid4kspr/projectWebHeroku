import { Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ApiService } from "./../core/http/api.service";
import {MatSnackBar} from '@angular/material';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
    @ViewChild(SignaturePad) signaturePad: SignaturePad;

    public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
        'minWidth': 2,
        'canvasWidth': 300,
        'canvasHeight': 200
    };

    loginForm: FormGroup;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;
    signatureChercheur: any
    constructor(private _formBuilder: FormBuilder, public ApiService: ApiService,private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            name: ['', Validators.required],
            originalLastName: [''],
            birthdate: ['', Validators.required],
            birthLocation: ['', Validators.required],
            sexe: ['', Validators.required],
            cin: [''],
            passeport: [''],
            grade: ['', Validators.required],
            etablissement: ['', Validators.required],
            tel: ['', Validators.required],
            email: ['', Validators.required],
            lastDiplome: ['', Validators.required],
            diplomeDate: ['', Validators.required],
            diplomeEtablissement: ['', Validators.required],
        });
        this.secondFormGroup = this._formBuilder.group({
            denominationLR: ['', Validators.required],
            responsableLR: ['', Validators.required],
            etablissementStep2: ['', Validators.required],
            universityStep2: ['', Validators.required],
        });
        this.thirdFormGroup = this._formBuilder.group({
            sujetDeRecherche: ['', Validators.required],
            tauxdavancement: ['', Validators.required],
            firstYearInscription: ['', Validators.required],
            universityStep3: ['', Validators.required],
            nameDirecteurThese: ['', Validators.required],
            signatureChercheur: ['']
        });
    }


    register() {
        
        var chercheurRequestBody = Object.assign({}, this.firstFormGroup.value, this.secondFormGroup.value, this.thirdFormGroup.value);
        this.ApiService.register(chercheurRequestBody).then(data=>{
            this.snackBar.open("Votre candidature a été retenue consulter votre boite mail","Done", {
                duration: 5000,
              });
            }
        )
    }

    ngAfterViewInit() {
        // this.signaturePad is now available
        this.signaturePad.set('minWidth', 2); // set szimek/signature_pad options at runtime
        this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    }

    drawComplete() {
        // will be notified of szimek/signature_pad's onEnd event
        console.log(this.signaturePad.toDataURL());
        this.signatureChercheur = this.signaturePad.toDataURL()
        this.thirdFormGroup.controls.signatureChercheur.patchValue(this.signatureChercheur)
    }

    drawStart() {
        // will be notified of szimek/signature_pad's onBegin event
        console.log('begin drawing');
    }
}
