import { AppDataSource } from '../../config/database';
import { payroll } from '../../entities/payroll';
import { User } from '../../entities/user_entity';
export const postPayrollService= async(
    employee_id:string|undefined,salary_amount:number,bonuses:number,deductions:number,net_pay:number,payment_date:number,
    tax_withheld:number,overtime_hours:number,overtime_pay:number,leave_deductions:number,remarks:number
  )=>{

    const payrollRepo=AppDataSource.getRepository(payroll)
    const userRepo=AppDataSource.getRepository(User)

    const user= await userRepo.findOneBy({id:employee_id})

    if(!user){
       throw new Error('user not found')
    }

    const newPayroll= payrollRepo.create({
        employee_id:user,
        salary_amount,
        bonuses,
        deductions,
        net_pay,
        payment_date,
        tax_withheld,
        overtime_hours,
        overtime_pay,
        leave_deductions,
        remarks
    })

    await payrollRepo.save(newPayroll)
    
    return newPayroll
}


export const updatePayrollService=async (
   payroll_id:string,salary_amount:number,bonuses:number,deductions:number,net_pay:number,payment_date:number,
    tax_withheld:number,overtime_hours:number,overtime_pay:number,leave_deductions:number,remarks:number
)=>{

    const  payrollRepo=AppDataSource.getRepository(payroll)

    const Payroll= await payrollRepo.findOneBy({id:payroll_id})



        
        if(!Payroll){
            throw new Error('payroll not found')
        }
    
       await payrollRepo.update(payroll_id,{
          salary_amount:salary_amount||Payroll.salary_amount,
          bonuses:bonuses|| Payroll.bonuses,
          deductions: deductions || Payroll.deductions,
          net_pay : net_pay || Payroll.net_pay,
          payment_date : payment_date || Payroll.payment_date,
          tax_withheld: tax_withheld || Payroll.tax_withheld,
          overtime_hours: overtime_hours || Payroll.overtime_hours,
          overtime_pay: overtime_pay || Payroll.overtime_pay,
          leave_deductions: leave_deductions || Payroll.leave_deductions,
          remarks: remarks || Payroll.remarks

        })
    
        const updatedPayroll= await payrollRepo.findOneBy({id:payroll_id})
        if(!updatedPayroll){
            throw new Error('error to update payroll')
        }
    
        return {
            message:"payroll updated success fully",
            updatedPayroll,
        }
    
    
    
}



export const getPayrollService=async()=>{
    const payrollRepo=AppDataSource.getRepository(payroll)

    const payrolls=await payrollRepo.find()

    if(!payrolls){ 
        throw new Error("failed to fetch payrolls")
    }

    return payrolls

}


export const getPayrollByIdService=async(payroll_id:string)=>{
    const payrollRepo=AppDataSource.getRepository(payroll)

    const Payroll=await payrollRepo.findOneBy({id:payroll_id})

    if(! Payroll){ 
        throw new Error("failed to fetch payroll")
    }

    return Payroll

}


export const deletePayrollService=async(payroll_Id:string)=>{
    const payrollRepo=AppDataSource.getRepository(payroll)

    const Payroll=await payrollRepo.findOneBy({id:payroll_Id})

    if(!Payroll){
        throw new Error('jobOpening not found')
    }

    await payrollRepo.delete(payroll_Id)

    return {message:'Payroll deleted succuss fully'}

}

    
    
   
    
