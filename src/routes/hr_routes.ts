import express from 'express'
import { addAttendance, addPayroll, create_jobOpenings, getAttendance, getAttendanceByUserId, getJobOpenings, getJobOpeningsById, getLeaveRequest, getLeaveRequestById, getPayroll, getPayrollById, jobOpeningsDelete, payrollDelete, updateAttendance, updateJobOpenings, updateLeaveRequest } from '../controllers/HR_controlls'


const router=express.Router()
router.post('/jobOpenings',create_jobOpenings);
router.put('/jobOpenings/:jobOpingId',updateJobOpenings);
router.get('/jobOpenings',getJobOpenings);
router.get('/jobOpenings/:jobOpeningsId',getJobOpeningsById);
router.delete('/jobOpenings/:jobOpeningsId',jobOpeningsDelete);

//attendance --------

router.post('/attendance/:userId',addAttendance);
router.put('/attendance/:userId',updateAttendance);
router.get('/attendance',getAttendance);
router.get('/attendance',getAttendanceByUserId);

//leave request----


router.put('/leaveRequest/:leaveId',updateLeaveRequest)
router.get('/leaveRequest',getLeaveRequest);
router.get('/leaveRequest/:leaveId',getLeaveRequestById);

//payrolls

router.post('payrolls',addPayroll)
router.put('payrolls',getPayroll)
router.get('payrolls/:payroll_id',getPayrollById)
router.delete('payrolls/:payrollId',payrollDelete)


export default router
