import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsString, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions} from "class-validator";
import { Transform, Type } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { format } from 'date-fns';


@ValidatorConstraint({ name: 'isFutureDate', async: false })
class IsFutureDateConstraint implements ValidatorConstraintInterface {
  validate(date: Date, args: ValidationArguments) {
    const currentDate = new Date();
    return date >= currentDate; 
  }

  defaultMessage(args: ValidationArguments) {
    return 'A dátum nem lehet a múltban!';
  }
}

function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFutureDateConstraint,
    });
  };
}

export class CreateKavezoDto {
    @IsString()
    @IsNotEmpty()
    felleponev: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date) 
    @Transform(({ value }) => new Date(value), { toClassOnly: true }) 
    kezdesido: Date;


    @IsInt()
    @IsNotEmpty()
    idotartam: number;

    @IsBoolean()
    elmarad: boolean = false;

    @Transform(({ value }) => format(value, 'yyyy-MM-dd'), { toPlainOnly: true })
    get formattedKezdesido(): string {
        return format(this.kezdesido, 'yyyy-MM-dd');
    }

}
