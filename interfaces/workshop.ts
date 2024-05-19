// {
//     name: "John's Workshop",
//     location: "La Fortuna",
//     speciality: "Factory Trained Technicians",
//     owner: "Owner 3",
//     imageUrl: "/imgs/image_2.png",
//     rating: 2,
// },


export interface Workshop {
    id : number;
    name: string;
    location: string;
    speciality: string;
    owner: string;
    imageUrl: string;
    rating: number;
}