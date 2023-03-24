import styles from '@/styles/Home.module.css'
import Card from '../../components/Card';

import Image from 'next/image';


interface digimon {
  id: number,
  name: string,
  href: string,
  image: string
}

interface pageable {
  currentPage: number,
  elementsOnPage: number,
  totalElements: number,
  totalPages: number,
  previousPage: string,
  nextPage: string,
}

interface props {
  digimons: {
    content: digimon[],
    pageable: pageable
  }
}


export async function getStaticProps() {

  const maxDigimons = 251;
  const api = "https://www.digi-api.com/api/v1/digimon"

  const res = await fetch(`${api}/?pageSize=${maxDigimons}`)
  const data = await res.json()

  return {
    props: {
      digimons: data,
    }
  }
}

export default function Home({ digimons }: props) {
  return (
    <>
      <div className={styles.title_container}>
        <h1 className={styles.title}>
          LFE_Digi<span>Next</span>
        </h1>
        <Image
          src={"/images/digivice.png"}
          width={50}
          height={50}
          alt='pokeNext'
        />
      </div>
      <div className={styles.digimon_container}>
        {digimons.content.map((digimon: digimon) => (
          <Card digimon={digimon} />
        ))}
      </div>
    </>
  )
}
