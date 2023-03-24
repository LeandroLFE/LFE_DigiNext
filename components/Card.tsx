import Image from 'next/image';
import Link from 'next/link';

import styles from "@/styles/Card.module.css"

interface digimon {
  digimon: {
    id: number,
    name: string,
    href: string,
    image: string
  }
}

export default function Card({ digimon }: digimon) {
  return (
    <div className={styles.card}>
      <Image
        src={`${digimon.image}`}
        width={120}
        height={120}
        alt={digimon.name}
      />
      <p className={styles.id}>#{digimon.id}</p>
      <h3 className={styles.title}>{digimon.name}</h3>
      <Link
        href={`/digimon/${digimon.id}`}
        className={styles.btn}
      >
        Detalhes
      </Link>
    </div>
  )
}