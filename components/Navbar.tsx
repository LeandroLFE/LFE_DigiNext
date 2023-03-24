import Link from "next/link";
import Image from "next/image";

import styles from "@/styles/Navbar.module.css"

export default function Navbar(){
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Image src="/images/digivice.png" alt="pokedex" height={30} width={30} />
                <h1>LFE_DigiNext</h1>
            </div>
            <ul className={styles.link_items}>
                <li>
                    <Link href="/" className={styles.link}>Home</Link>
                </li>
                <li>
                    <Link href="/about" className={styles.link}>Sobre</Link>
                </li>
            </ul>
        </nav>
    )
}