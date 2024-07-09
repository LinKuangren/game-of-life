<template>
    <header>
        <router-link to="/"><img alt="logo_simweb" class="logo_simweb" src="@/assets/logo.png" width="150" height="150" /></router-link>
        <div class="header_nav">
            <nav>
                <RouterLink to="/" class="menu">Home</RouterLink>
                <RouterLink to="/simulateur" class="menu">Simulateur</RouterLink>
                <RouterLink to="/wiki" class="menu">Wiki</RouterLink>
            </nav>
        </div>
    </header>
</template>