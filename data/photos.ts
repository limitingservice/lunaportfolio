export type PhotoCategory = 'film' | 'digital' | 'textiles';

export interface Photo {
    src: string;
    alt: string;
    category: PhotoCategory;
    width: number;
    height: number;
}

export const filmPhotos: Photo[] = [
    { src: '/photos/film/detroit.jpg', alt: 'Detroit, film', category: 'film', width: 1920, height: 1227 },
    { src: '/photos/film/Singer-1.jpg', alt: 'Singer on film', category: 'film', width: 662, height: 1000 },
    { src: '/photos/film/building.jpg', alt: 'Building, film', category: 'film', width: 687, height: 1000 },
    { src: '/photos/film/car.jpg', alt: 'Car study, film', category: 'film', width: 693, height: 1000 },
    { src: '/photos/film/car1.jpeg', alt: 'Car study II, film', category: 'film', width: 1102, height: 1600 },
    { src: '/photos/film/car2.jpeg', alt: 'Car study III, film', category: 'film', width: 1072, height: 1600 },
    { src: '/photos/film/flea.jpeg', alt: 'Flea market, film', category: 'film', width: 1003, height: 1600 },
    { src: '/photos/film/flea1.jpeg', alt: 'Flea market II, film', category: 'film', width: 1280, height: 1600 },
    { src: '/photos/film/flea2.jpeg', alt: 'Flea market III, film', category: 'film', width: 1029, height: 1600 },
    { src: '/photos/film/flea3.jpeg', alt: 'Flea market IV, film', category: 'film', width: 1094, height: 1600 },
    { src: '/photos/film/img0006.jpg', alt: 'Untitled 0006, film', category: 'film', width: 1573, height: 2400 },
    { src: '/photos/film/img0019.jpg', alt: 'Untitled 0019, film', category: 'film', width: 1597, height: 2400 },
    { src: '/photos/film/kitoshoe.jpg', alt: 'Kito shoe, film', category: 'film', width: 1593, height: 2400 },
    { src: '/photos/film/sports.jpeg', alt: 'Sports, film', category: 'film', width: 1280, height: 1600 },
    { src: '/photos/film/sports1.jpeg', alt: 'Sports II, film', category: 'film', width: 1280, height: 1600 },
    { src: '/photos/film/bay-1.jpg', alt: 'Bay, film', category: 'film', width: 1000, height: 618 },
    { src: '/photos/film/foshow.jpg', alt: 'Foshow, film', category: 'film', width: 1000, height: 655 },
    { src: '/photos/film/foshow1.jpg', alt: 'Foshow II, film', category: 'film', width: 1000, height: 672 },
    { src: '/photos/film/group-native-1.jpg', alt: 'Group — Native, film', category: 'film', width: 1000, height: 656 },
    { src: '/photos/film/jawn13.jpeg', alt: 'Jawn study, film', category: 'film', width: 1097, height: 1600 },
    { src: '/photos/film/jawn14.jpeg', alt: 'Jawn study II, film', category: 'film', width: 1035, height: 1600 },
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
    { src: '/photos/digital/austin-native.jpg', alt: 'Austin — Native', category: 'digital', width: 2400, height: 1600 },
    { src: '/photos/digital/bay.jpg', alt: 'Bay', category: 'digital', width: 1694, height: 2400 },
    { src: '/photos/digital/group-native.jpg', alt: 'Group — Native', category: 'digital', width: 2400, height: 1600 },
    { src: '/photos/digital/whop-native.jpg', alt: 'Whop — Native', category: 'digital', width: 2400, height: 1600 },
    { src: '/photos/digital/fo.jpg', alt: 'Fo', category: 'digital', width: 1600, height: 2400 },
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
    { src: '/photos/textiles/jawn1.jpeg', alt: 'Old American Goods — piece 17', category: 'textiles', width: 1600, height: 1391 },
    { src: '/photos/textiles/jawn2.jpeg', alt: 'Old American Goods — piece 18', category: 'textiles', width: 1200, height: 1600 },
    { src: '/photos/textiles/jawn3.jpeg', alt: 'Old American Goods — piece 19', category: 'textiles', width: 1200, height: 1600 },
    { src: '/photos/textiles/jawn4.jpeg', alt: 'Old American Goods — piece 20', category: 'textiles', width: 1200, height: 1600 },
    { src: '/photos/textiles/jawn5.jpeg', alt: 'Old American Goods — piece 21', category: 'textiles', width: 1200, height: 1600 },
    { src: '/photos/textiles/jawn6.jpeg', alt: 'Old American Goods — piece 22', category: 'textiles', width: 1341, height: 1600 },
    { src: '/photos/textiles/jawn7.jpeg', alt: 'Old American Goods — piece 23', category: 'textiles', width: 1307, height: 1600 },
    { src: '/photos/textiles/jawn8.jpeg', alt: 'Old American Goods — piece 24', category: 'textiles', width: 1291, height: 1600 },
    { src: '/photos/textiles/jawn9.jpeg', alt: 'Old American Goods — piece 25', category: 'textiles', width: 1200, height: 1600 },
    { src: '/photos/textiles/jawn10.jpeg', alt: 'Old American Goods — piece 26', category: 'textiles', width: 1368, height: 1600 },
    { src: '/photos/textiles/jawn11.jpeg', alt: 'Old American Goods — piece 27', category: 'textiles', width: 1600, height: 1589 },
    { src: '/photos/textiles/jawn12.jpeg', alt: 'Old American Goods — piece 28', category: 'textiles', width: 1200, height: 1600 },
];

export const allPhotos: Photo[] = [...digitalPhotos, ...filmPhotos];
