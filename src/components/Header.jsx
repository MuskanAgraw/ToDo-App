import React from 'react'
import { motion } from 'framer-motion'; 
const Header = () => {
    return (
        <header>
            <motion.h1
                class="motion-h1"
                initial={{ y: -200 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
            >
                ToDo App
            </motion.h1>
        </header>
    )
}

export default Header