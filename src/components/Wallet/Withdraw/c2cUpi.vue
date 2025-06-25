<template>
	<div class="c2cUpi" :class="{ noUpi: !withdrawalslist.length }" @click="goPath(acitveUpi.bid)">
		<template v-if="withdrawalslist.length">
			<div class="title">{{ $t('upiCollectMoney') }}</div>
			<div class="name">{{ acitveUpi.upiAccount }}</div>
			<van-icon name="arrow" class="right-icon" size="12" />
		</template>
		<template v-else>{{ $t('addUpi') }} </template>
	</div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const router = useRouter()

const props = defineProps({
	withdrawalslist: {
		type: Array,
		default: () => []
	},
	bid: {
		default: -0
	}
})

const acitveUpi = <any>computed(() => {
	return (
		props.withdrawalslist.find((item: any) => {
			return item.bid == props.bid
		}) || {}
	)
})

const goPath = (bid: any) => {
	router.replace({ name: 'Withdraw-Upi', query: { bid, fromV: route.name as string } })
}

onMounted(() => {})
</script>

<style style lang="scss" scoped>
.c2cUpi {
	height: 160px;
	background: var(--bg_color_L2);
	box-shadow:var(--BoxShadowColor-9);
	border-radius: 20px;
	padding: 36px 20px;
	text-align: left;
	position: relative;
	margin-bottom: 25px;

	&.noUpi {
		background-image: url('@/assets/icons/wallet/withdraw/add.png');
		background-size: 88px;
		background-repeat: no-repeat;
		background-position: center 18px;
		color: var(--text_color_L3);
		text-align: center;
		padding: 110px 0 0 0;
	}

	.title {
		height: 40px;
		line-height: 40px;
		padding-left: 102px;
		font-size: 28px;
		color: var(--text_color_L1);
		background-image: url('@/assets/icons/wallet/withdraw/c2c/upi.png');
		background-size: 80px 34px;
		background-repeat: no-repeat;
		background-position: left center;
	}

	.name {
		height: 36px;
		line-height: 36px;
		color: var(--text_color_L2);
		font-size: 26px;
		margin-top: 16px;
	}

	.right-icon {
		position: absolute;
		right: 36px;
		top: 50%;
		transform: translateY(-50%);
	}
}
</style>
