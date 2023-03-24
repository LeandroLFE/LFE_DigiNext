import { GetStaticPropsContext } from "next"
import Image from 'next/image';

import styles from '@/styles/Digimon.module.css'

import { useRouter } from "next/router";
import Loading from "../../../components/Loading";

interface digimon {
    digimon: {
        id: number
        name: string
        href: string
        image: string
    }
}

interface image {
    href: string
    transparent: boolean
}

interface level {
    id: number
    level: string
}

interface type {
    id: number
    type: string
}

interface field {
    id: number
    field: string
}

interface attribute {
    id: number
    attribute: string
}

interface description {
    origin: string
    language: string
    description: string
}

interface skill {
    id: number
    skill: string
    translation: string
    description: string
}

interface evolution {
    id: number
    digimon: string
    condition: string
    image: string
}


interface digimonData {
    digimonData: {
        id: number
        name: string
        xAntibody: boolean
        images: image[]
        levels: level[]
        types: type[]
        fields: field[]
        attributes: attribute[]
        releaseDate: string
        descriptions: description[]
        skills: skill[]
        priorEvolutions: evolution[]
        nextEvolutions: evolution[]
    }
}

export const getStaticPaths = async () => {
    const maxDigimons = 251;
    const api = "https://www.digi-api.com/api/v1/digimon"

    const res = await fetch(`${api}/?pageSize=${maxDigimons}`)
    const data = await res.json()

    // params    
    const paths = data.content.map((digimon: digimon["digimon"]) => {
        return {
            params: { digimonId: (digimon.id).toString() },
        }
    })

    return {
        paths,
        fallback: true,
    }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {

    const id = context.params?.digimonId
    const api = "https://www.digi-api.com/api/v1/digimon"

    const res = await fetch(`${api}/${id}`)

    if (res.status === 404 || res.status === 400) {
        return {
            notFound: true
        }
    }

    const data = await res.json()

    return {
        props: { digimonData: data },
    }

}

export default function Digimon({ digimonData }: digimonData) {

    const router = useRouter()

    if (router.isFallback) {
        return <Loading />
    }

    return (
        <div className={styles.digimon_container}>
            <h1 className={styles.title}>{digimonData.name}</h1>
            <Image
                src={`${digimonData.images[0].href}`}
                width="200"
                height="200"
                alt={digimonData.name}
            />
            <div>
                <h3>Número:</h3>
                <p>#{digimonData.id}</p>
            </div>
            <div>
                <h3>Níveis:</h3>
                <div className={styles.levels_container}>
                    {digimonData.levels.map((item) => (
                        <span
                            key={`level_${item.id}`}
                            className={`${styles.type} ${styles['level_' + item.level]}`}
                        >
                            {item.level}
                        </span>
                    ))}
                </div>
            </div>
            <div>
                <h3>Tipo:</h3>
                <div className={styles.types_container}>
                    {digimonData.types.map((item) => (
                        <span
                            key={`type_${item.id}`}
                            className={`${styles.type} ${styles['type_' + item.type]}`}
                        >
                            {item.type}
                        </span>
                    ))}
                </div>
            </div>
            <div>
                <h3>Atributos:</h3>
                <div className={styles.attributes_container}>
                    {digimonData.attributes.map((item) => (
                        <span
                            key={`attribute_${item.id}`}
                            className={`${styles.type} ${styles['attribute_' + item.attribute]}`}
                        >
                            {item.attribute}
                        </span>
                    ))}
                </div>
            </div>
            <div>
                <h3>Campos:</h3>
                <div className={styles.fields_container}>
                    {digimonData.fields.map((item) => (
                        <span
                            key={`field_${item.id}`}
                            className={`${styles.field} ${styles['field_' + item.field]}`}
                        >
                            <Image src={`https://digimon-api.com/images/etc/fields/${item.field}.png`} alt={item.field} height={32} width={32} />
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}