import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";

export default class validateForm{

  static validateFormFields(formgroup : UntypedFormGroup)
  {
    Object.keys(formgroup.controls).forEach(field => {
      const control  = formgroup.get(field);
      if(control instanceof UntypedFormControl)
      {
        control?.markAsDirty({onlySelf: true});
      }else if(control instanceof UntypedFormGroup)
      {
        this.validateFormFields(control)
      }

    });

  }

}
