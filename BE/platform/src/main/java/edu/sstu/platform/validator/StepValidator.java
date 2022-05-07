package edu.sstu.platform.validator;

import edu.sstu.platform.annotation.Step;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class StepValidator implements ConstraintValidator<Step, Float> {

  private float step;

  @Override
  public void initialize(Step constraintAnnotation) {
    step = constraintAnnotation.value();
  }

  @Override
  public boolean isValid(Float value, ConstraintValidatorContext ctx) {
    return value % step == 0;
  }
}
