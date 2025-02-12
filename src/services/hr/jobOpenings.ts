import { AppDataSource } from "../../config/database"
import { Branches } from "../../entities/Branches"
import { jobOpenings } from "../../entities/jobOpenings"

export const jobOpenings_service =async(
    branchId:string,job_title:string,description:string,requirements:string, location:string, salary_range:string,closed_at:string
    )=>{

        const jobOpeningsRepo=AppDataSource.getRepository(jobOpenings)
        const branchRepo=AppDataSource.getRepository(Branches)

        const branch= await branchRepo.findOneBy({id:branchId})
        if(!branch){
            throw new Error("branchId is no valid")
        }

        const newJobOpenings = jobOpeningsRepo.create({
            branch,
            job_title,
            description,
            requirements,
            location,
            salary_range,
            closed_at
        })  

        await jobOpeningsRepo.save(newJobOpenings)

        return newJobOpenings
}




export const jobOpeningUpdateService=async(
    jobOpeningId:string,job_title:string,description:string,requirements:string, location:string, salary_range:string,closed_at:string
    )=>{
    const jobOpeningRepo=AppDataSource.getRepository(jobOpenings)

    const jobOpening= await jobOpeningRepo.findOneBy({id:jobOpeningId})
    if(!jobOpening){
        throw new Error('jobOpening not found')
    }

   await jobOpeningRepo.update(jobOpeningId ,{
      job_title:job_title|| jobOpening.job_title,
      description:description|| jobOpening.description,
      requirements:requirements|| jobOpening.requirements,
      location:location|| jobOpening.location,
      salary_range:salary_range|| jobOpening.salary_range,
      closed_at:closed_at|| jobOpening.closed_at
    })

    const updatedJobOpening= await jobOpeningRepo.findOneBy({id:jobOpeningId})
    if(!updatedJobOpening){
        throw new Error('error to update jobOpenings')
    }

    return {
        message:'JobOpening updated successfully',
        JobOpening:updatedJobOpening
    }

}


export const getJobOpeningService=async()=>{
    const jobOpeningsRepo=AppDataSource.getRepository(jobOpenings)

    const jobOpening=await jobOpeningsRepo.find()

    if(!jobOpening){ 
        throw new Error("failed to fetch jobOpenings")
    }

    return jobOpening

}



export const getJobOpeningsByIdService=async(jobOpeningsId:string)=>{
    const jobOpeningsRepo=AppDataSource.getRepository(jobOpenings)

    const jobOpening=await jobOpeningsRepo.findOneBy({id:jobOpeningsId})

    if(!jobOpening){ 
        throw new Error("failed to fetch jobOpenings")
    }

    return jobOpening

}



export const deleteJobOpeningsService=async(JobOpeningId:string)=>{
    const jobOpeningRepo=AppDataSource.getRepository(jobOpenings)

    const jobOpening=await jobOpeningRepo.findOneBy({id:JobOpeningId})

    if(!jobOpening){
        throw new Error('jobOpening not found')
    }

    await jobOpeningRepo.delete(JobOpeningId)

    return {message:'jobOpening deleted succuss fully'}

}







