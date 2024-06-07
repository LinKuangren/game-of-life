<template>
    <footer>
        <div>
            <nav>
                <router-link to="/" class="menu">Accueil</router-link>
                <router-link to="/wiki" class="menu">Wiki</router-link>
                <router-link to="/" class="menu">Simulateur</router-link>
                <router-link to="/" class="menu">Se connecter</router-link>
            </nav>
        </div>
        <router-link to="/"><img alt="logo_simweb" class="logo_simweb_footer" src="@/assets/logo.png" width="125" height="125" /></router-link>
    </footer>
</template>