Problem Statement - Create Apis for the following :

1.) Users must be able to login / logout using email ID and Password. OTP should be sent to email ID. User Session and Authentication should be taken care of. Please create an API endpoint for the same.

2.) Create a POST API,  where logged in users can post any Task. The following are the required fields : Date, Task : String,  Status : Completed / Incomplete. The task is basically a string which contains the task. Eg : Swimming for one hour

3.) Create a Patch API where a logged in user must have the provision to edit the Task. He should have the provision to edit one or more parameters of the Task Object. Eg : Date, Task or Status

4.) Create a delete API where the user must have provision to delete a particular task.

Note : All These APIs must be accessible only by logged in Users. Give necessary error messages. For testing, set an automatic session time out of 30 seconds. Session Invalid Error Notifications should also be displayed.

5.) Create a GET API where you can view all the posted tasks.

6.) Also Create an API where the user can sort the posted tasks & post it in this new API with the sorted sequence of tasks. ( Please note that in this new API, the user will post the task id in the sorted sequence )

Please Note the sorted sequence of tasks should reflect in the GET API.

7.) Please host these APIs on any free server / Amazon Test Account. Please feel free to reply to this email / schedule a call with us for any queries.

Please implement pagination for the GET & SORT APIs

Note: - You are supposed to create only backend APIs. You need not create Frontend UIs.

We would be assessing this assignment from the POV of a Senior Node.js Developer. Ensure you write clean code, use solid principles and use the latest coding conventions.

--------------------------
```
designing workflow :
sub taskes :  
[X]1) need to create a login/registration 
[X]2) need to create opt auth once validating login.
[ ]3) on successfull login need to generate an auth key to enable other keys to work with timeout 30 seconds.
[ ]4) based on authkey generated need to create the following points
[ ]    -> post request to created a task
[ ]    -> patch request to update the task discription.
[ ]    -> delete reqest to delete the task 
[ ]    -> get request to get the task( all users tasks).
[ ]5) Sort Task
[ ]5) Deploy in free hosting
```

--------------
