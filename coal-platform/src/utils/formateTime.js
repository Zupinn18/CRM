export const formateTime = (time) =>{
   if(time){
    const utcDateString = time;
    const utcDate = new Date(utcDateString);

    // Convert UTC to IST
    const istDateString = utcDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    // Extract time from IST string
    const istTime = istDateString.split(',')[1].trim().split(' ')[0];
    return istTime;
   }
};