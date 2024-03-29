const A_p='Group A+ can donate red blood cells to A+ and AB+ but can receive from A+, A-, O+ and O-';
const B_p='Group B+ can donate red blood cells to B+ and AB+ but can receive from B+, B-, O+ and O-';
const AB_p='Group AB+ can donate red blood cells to AB+ but can receive from all others';
const O_p='Group O+ can donate red blood cells to all postitive bloods but can receive from O+ and O-';
const A_n='Group A- can donate red blood cells to A+, A-, B+ and B- but can receive from A-and O-';
const B_n='Group B- can donate red blood cells to B+, B-, AB+ and AB- but can receive from B-and O-';
const AB_n='Group AB- can donate red blood cells to AB+ and AB- but can receive from AB- and O-';
const O_n='Group O- can donate red blood cells to all positive & negative bloods but can receive from O-';


export const bloods=[
    {
        group:'A+',
        details:A_p,
        receive:['A+','A-','O+','O-']
    },
    {
        group:'A-',
        details:A_n,
        receive:['A-','O-']
    },
    {
        group:'B+',
        details: B_p,
        receive:['B+','B-','O+','O-']
    },
    {
        group:'B-',
        details:B_n,
        receive:['B-','O-']
    },
    {
        group:'AB+',
        details:AB_p,
        receive:['A+','A-','B+','B-','AB+','AB-','O+','O-']
    },
    {
        group:'AB-',
        details:AB_n,
        receive:['AB-','O-']
    },
    {
        group:'O+',
        details:O_p,
        receive:['O+','O-']
    },
    {
        group:'O-',
        details:O_n,
        receive:['O-']
    }
]