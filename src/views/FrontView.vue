<template>
	<NavbarVue></NavbarVue>
	<router-view></router-view>
	<FooterVue></FooterVue>
</template>

<script>
import NavbarVue from "@/components/Navbar.vue";
import FooterVue from "@/components/Footer.vue";

export default {
	components: {
		NavbarVue,
		FooterVue,
	},
};
</script>

<style></style>
