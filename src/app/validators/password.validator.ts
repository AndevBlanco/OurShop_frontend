import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"

export const passwordMatch: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get("newPassword")
  const confirmarPassword = control.get("newConfirmPassword")

  return password.value === confirmarPassword.value
    ? null
    : { noSonIguales: true }
}