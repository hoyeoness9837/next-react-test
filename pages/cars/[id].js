
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'

export default function Car({ car }) {

    const router = useRouter()
    const { id } = router.query
    return (
        <div className={styles.container}>
            <Head>
                <title>{car.color} {car.id}</title>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    {id}
                </h1>

                <img src={car.image} width="300px" />

            </main>
        </div>
    )
}


export async function getServerSideProps({ params }) {
    const req = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await req.json();

    return {
        props: { car: data },
    }
}

// this will allow changes param dynamically, such as localhost:3000/cars/123 ->(here {id} is query, 123) This car is 123

// // SSG Static Generation Example, tells Next.js to pre-render page.
// export async function getStaticProps({ params }) {
//   // fetch req from param of url and save it as data, then return static prop as 'car'that can be used in Car() function static page.
//   const req = await fetch(`http://localhost:3000/${params.id}.json`);
//   const data = await req.json();

//   return {
//     props: { car: data },
//   };
// }

// //next has no idea how many pages are associated to dynamic routes..
// //next needs to know cars id in advance!
// export async function getStaticPaths() {
//   const req = await fetch('http://localhost:3000/cars.json');
//   const data = await req.json();
//   const paths = data.map((car) => {
//     return { params: { id: car } };
//   });

//   return {
//     paths,
//     fallback: false, // just additional functions, no needs.
//   };
// }


// ERR
// You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps
