export type PhotoCategory = 'film' | 'digital' | 'textiles';

export interface Photo {
    src: string;
    alt: string;
    category: PhotoCategory;
    width: number;
    height: number;
}

export const filmPhotos: Photo[] = [
    { src: '/photos/film/Singer-1.jpg', alt: 'Singer on film', category: 'film', width: 662, height: 1000 },
    { src: '/photos/film/building.jpg', alt: 'Building, film', category: 'film', width: 687, height: 1000 },
    { src: '/photos/film/car.jpg', alt: 'Car study, film', category: 'film', width: 693, height: 1000 },
    { src: '/photos/film/car1.jpeg', alt: 'Car study II, film', category: 'film', width: 1102, height: 1600 },
    { src: '/photos/film/car2.jpeg', alt: 'Car study III, film', category: 'film', width: 1072, height: 1600 },
    { src: '/photos/film/flea.jpeg', alt: 'Flea market, film', category: 'film', width: 1003, height: 1600 },
    { src: '/photos/film/flea1.jpeg', alt: 'Flea market II, film', category: 'film', width: 1280, height: 1600 },
    { src: '/photos/film/flea2.jpeg', alt: 'Flea market III, film', category: 'film', width: 1029, height: 1600 },
    { src: '/photos/film/flea3.jpeg', alt: 'Flea market IV, film', category: 'film', width: 1070, height: 1600 },
    { src: '/photos/film/img0006.jpg', alt: 'Untitled 0006, film', category: 'film', width: 1573, height: 2400 },
    { src: '/photos/film/img0019.jpg', alt: 'Untitled 0019, film', category: 'film', width: 1597, height: 2400 },
    { src: '/photos/film/kitoshoe.jpg', alt: 'Kito shoe, film', category: 'film', width: 1593, height: 2400 },
    { src: '/photos/film/sports.jpeg', alt: 'Sports, film', category: 'film', width: 1280, height: 1600 },
    { src: '/photos/film/sports1.jpeg', alt: 'Sports II, film', category: 'film', width: 1280, height: 1600 },
];

export const digitalPhotos: Photo[] = [
    { src: '/photos/digital/Couple.jpg', alt: 'Couple', category: 'digital', width: 1600, height: 2400 },
    { src: '/photos/digital/couple2.jpg', alt: 'Couple II', category: 'digital', width: 2400, height: 1600 },
    { src: '/photos/digital/Lenny  - Native.jpg', alt: 'Lenny — Native', category: 'digital', width: 1600, height: 2400 },
    { src: '/photos/digital/Model1.jpg', alt: 'Model I', category: 'digital', width: 1600, height: 2400 },
    { src: '/photos/digital/Model2.jpg', alt: 'Model II', category: 'digital', width: 1600, height: 2400 },
    { src: '/photos/digital/PV.jpg', alt: 'PV', category: 'digital', width: 2400, height: 1758 },
    { src: '/photos/digital/Singer.jpg', alt: 'Singer', category: 'digital', width: 2400, height: 1791 },
    { src: '/photos/digital/Whop.jpg', alt: 'Whop', category: 'digital', width: 1600, height: 2400 },
    { src: '/photos/digital/chaz-native.jpg', alt: 'Chaz — Native', category: 'digital', width: 1600, height: 2400 },
    { src: '/photos/digital/hannah-native.jpg', alt: 'Hannah — Native', category: 'digital', width: 1600, height: 2400 },
    { src: '/photos/digital/kitoshoe2.jpg', alt: 'Kito shoe II', category: 'digital', width: 1600, height: 2400 },
    { src: '/photos/digital/kitoshoe3.jpg', alt: 'Kito shoe III', category: 'digital', width: 1600, height: 2400 },
    { src: '/photos/digital/ugmeg.jpg', alt: 'UG Meg', category: 'digital', width: 1600, height: 2400 },
];

export const textilesPhotos: Photo[] = [
    { src: '/photos/textiles/j1.jpeg', alt: 'Old American Goods — piece 01', category: 'textiles', width: 1342, height: 1600 },
    { src: '/photos/textiles/j2.jpeg', alt: 'Old American Goods — piece 02', category: 'textiles', width: 1440, height: 1358 },
    { src: '/photos/textiles/j3.jpeg', alt: 'Old American Goods — piece 03', category: 'textiles', width: 1280, height: 1600 },
    { src: '/photos/textiles/j4.jpeg', alt: 'Old American Goods — piece 04', category: 'textiles', width: 1280, height: 1600 },
    { src: '/photos/textiles/j5.jpeg', alt: 'Old American Goods — piece 05', category: 'textiles', width: 1500, height: 1600 },
    { src: '/photos/textiles/j6.jpeg', alt: 'Old American Goods — piece 06', category: 'textiles', width: 1200, height: 1600 },
    { src: '/photos/textiles/j7.jpeg', alt: 'Old American Goods — piece 07', category: 'textiles', width: 900, height: 1600 },
    { src: '/photos/textiles/j8.jpeg', alt: 'Old American Goods — piece 08', category: 'textiles', width: 1337, height: 1600 },
    { src: '/photos/textiles/j9.jpeg', alt: 'Old American Goods — piece 09', category: 'textiles', width: 1495, height: 1600 },
    { src: '/photos/textiles/j10.jpeg', alt: 'Old American Goods — piece 10', category: 'textiles', width: 1358, height: 1600 },
    { src: '/photos/textiles/j11.jpeg', alt: 'Old American Goods — piece 11', category: 'textiles', width: 1200, height: 1600 },
    { src: '/photos/textiles/j12.jpeg', alt: 'Old American Goods — piece 12', category: 'textiles', width: 1600, height: 1585 },
    { src: '/photos/textiles/j13.jpeg', alt: 'Old American Goods — piece 13', category: 'textiles', width: 1518, height: 1599 },
    { src: '/photos/textiles/j14.jpeg', alt: 'Old American Goods — piece 14', category: 'textiles', width: 1497, height: 1600 },
    { src: '/photos/textiles/j15.jpeg', alt: 'Old American Goods — piece 15', category: 'textiles', width: 1200, height: 1600 },
    { src: '/photos/textiles/j16.jpeg', alt: 'Old American Goods — piece 16', category: 'textiles', width: 1200, height: 1600 },
];

export const allPhotos: Photo[] = [...digitalPhotos, ...filmPhotos];
