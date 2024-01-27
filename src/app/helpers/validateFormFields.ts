import { FormControl, FormGroup } from "@angular/forms";

export default class validateForm{

  static validateFormFields(formgroup : FormGroup)
  {
    Object.keys(formgroup.controls).forEach(field => {
      const control  = formgroup.get(field);
      if(control instanceof FormControl)
      {
        control?.markAsDirty({onlySelf: true});
      }else if(control instanceof FormGroup)
      {
        this.validateFormFields(control)
      }

    });

  }

}
