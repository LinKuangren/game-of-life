<template>
    <header class="flex bg-blueF text-white px-40 py-1 justify-between">
        <router-link to="/"><img alt="logo_simweb" class="justify-center" src="@/assets/logo.png" width="150" height="150" /></router-link>
        <div class="content-center">
            <nav class="font-bold justify-center">
                <RouterLink to="/" class="my-0 mx-2	">Home</RouterLink>
                <RouterLink to="/simulateur" class="my-0 mx-2	">Simulateur</RouterLink>
                <RouterLink to="/wiki" class="my-0 mx-2	">Wiki</RouterLink>
            </nav>
        </div>
    </header>
</template>