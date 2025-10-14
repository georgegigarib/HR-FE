<template>
  <section class="py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Trial Plan -->
        <BaseCard class="relative p-8 border-2 border-gray-200">
          <div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">
              {{ $t('pricing.plans.trial.name') }}
            </h3>
            <div class="mb-6">
              <span class="text-4xl font-bold text-gray-900">$0</span>
              <span class="text-gray-600 ml-1">/ {{ $t('pricing.plans.trial.period') }}</span>
            </div>
            <p class="text-gray-600 mb-8">
              {{ $t('pricing.plans.trial.description') }}
            </p>

            <!-- Features -->
            <ul class="space-y-4 mb-8 text-left">
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{ $t('pricing.plans.trial.features.cvs') }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{ $t('pricing.plans.trial.features.users') }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{ $t('pricing.plans.trial.features.ai') }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{ $t('pricing.plans.trial.features.support') }}</span>
              </li>
            </ul>

            <BaseButton variant="outline" class="w-full" @click="selectPlan('trial')">
              {{ $t('pricing.plans.trial.cta') }}
            </BaseButton>
          </div>
        </BaseCard>

        <!-- Starter Plan -->
        <BaseCard class="relative p-8 border-2 border-gray-200">
          <div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">
              {{ $t('pricing.plans.starter.name') }}
            </h3>
            <div class="mb-6">
              <span class="text-4xl font-bold text-gray-900"> ${{ isAnnual ? '39' : '49' }} </span>
              <span class="text-gray-600 ml-1">/ {{ $t('pricing.plans.starter.period') }}</span>
            </div>
            <p class="text-gray-600 mb-8">
              {{ $t('pricing.plans.starter.description') }}
            </p>

            <!-- Features -->
            <ul class="space-y-4 mb-8 text-left">
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{ $t('pricing.plans.starter.features.cvs') }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{ $t('pricing.plans.starter.features.users') }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{ $t('pricing.plans.starter.features.ai') }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{ $t('pricing.plans.starter.features.export') }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{
                  $t('pricing.plans.starter.features.support')
                }}</span>
              </li>
            </ul>

            <BaseButton variant="outline" class="w-full" @click="selectPlan('starter')">
              {{ $t('pricing.plans.starter.cta') }}
            </BaseButton>
          </div>
        </BaseCard>

        <!-- Professional Plan -->
        <BaseCard class="relative p-8 border-2 border-blue-500 bg-blue-50">
          <!-- Popular Badge -->
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span class="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              {{ $t('pricing.plans.professional.badge') }}
            </span>
          </div>

          <div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">
              {{ $t('pricing.plans.professional.name') }}
            </h3>
            <div class="mb-6">
              <span class="text-4xl font-bold text-gray-900"> ${{ isAnnual ? '79' : '99' }} </span>
              <span class="text-gray-600 ml-1"
                >/ {{ $t('pricing.plans.professional.period') }}</span
              >
            </div>
            <p class="text-gray-600 mb-8">
              {{ $t('pricing.plans.professional.description') }}
            </p>

            <!-- Features -->
            <ul class="space-y-4 mb-8 text-left">
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{
                  $t('pricing.plans.professional.features.cvs')
                }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{
                  $t('pricing.plans.professional.features.users')
                }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{
                  $t('pricing.plans.professional.features.ai')
                }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{
                  $t('pricing.plans.professional.features.export')
                }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{
                  $t('pricing.plans.professional.features.analytics')
                }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{
                  $t('pricing.plans.professional.features.support')
                }}</span>
              </li>
            </ul>

            <BaseButton variant="primary" class="w-full" @click="selectPlan('professional')">
              {{ $t('pricing.plans.professional.cta') }}
            </BaseButton>
          </div>
        </BaseCard>

        <!-- Enterprise Plan -->
        <BaseCard class="relative p-8 border-2 border-gray-200">
          <div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">
              {{ $t('pricing.plans.enterprise.name') }}
            </h3>
            <div class="mb-6">
              <span class="text-4xl font-bold text-gray-900">
                ${{ isAnnual ? '159' : '199' }}
              </span>
              <span class="text-gray-600 ml-1">/ {{ $t('pricing.plans.enterprise.period') }}</span>
            </div>
            <p class="text-gray-600 mb-8">
              {{ $t('pricing.plans.enterprise.description') }}
            </p>

            <!-- Features -->
            <ul class="space-y-4 mb-8 text-left">
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{ $t('pricing.plans.enterprise.features.cvs') }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{
                  $t('pricing.plans.enterprise.features.users')
                }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{ $t('pricing.plans.enterprise.features.ai') }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{
                  $t('pricing.plans.enterprise.features.export')
                }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{
                  $t('pricing.plans.enterprise.features.analytics')
                }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{ $t('pricing.plans.enterprise.features.api') }}</span>
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-green-500 mr-3" />
                <span class="text-gray-700">{{
                  $t('pricing.plans.enterprise.features.support')
                }}</span>
              </li>
            </ul>

            <BaseButton variant="outline" class="w-full" @click="selectPlan('enterprise')">
              {{ $t('pricing.plans.enterprise.cta') }}
            </BaseButton>
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import { CheckIcon } from '@heroicons/vue/24/outline'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

const { t } = useI18n()
const router = useRouter()

interface Props {
  isAnnual: boolean
}

defineProps<Props>()

const selectPlan = (plan: string) => {
  toast.success(t('pricing.messages.planSelected', { plan }))
  router.push('/register')
}
</script>
