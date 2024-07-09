<template>
    <footer class="bg-blueF text-white py-1">
        <div>
            <nav class="flex font-bold justify-center my-4">
                <router-link to="/" class="my-0 mx-2	">Accueil</router-link>
                <router-link to="/wiki" class="my-0 mx-2	">Wiki</router-link>
                <router-link to="/" class="my-0 mx-2	">Simulateur</router-link>
                <router-link to="/" class="my-0 mx-2	">Se connecter</router-link>
            </nav>
        </div>
        <div class="flex justify-center">
            <router-link to="/"><img alt="logo_simweb" class="justify-center" src="@/assets/logo.png" width="125" height="125" /></router-link>
        </div>
    </footer>
</template>