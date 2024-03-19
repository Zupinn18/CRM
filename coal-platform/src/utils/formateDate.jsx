export const formateDate = (date) =>{
    var myDate = new Date(date);
    return myDate.toLocaleDateString();
};