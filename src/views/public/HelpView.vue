<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <router-link to="/" class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">HR</span>
              </div>
              <span class="text-xl font-bold text-gray-900">CVAnalyzer</span>
            </router-link>
          </div>
          
          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link
              to="/services"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {{ $t('navigation.services') }}
            </router-link>
            <router-link
              to="/pricing"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {{ $t('navigation.pricing') }}
            </router-link>
            <router-link
              to="/help"
              class="text-blue-600 font-medium"
            >
              {{ $t('navigation.help') }}
            </router-link>
          </div>
          
          <!-- Auth Buttons -->
          <div class="flex items-center space-x-4">
            <router-link
              to="/login"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              {{ $t('auth.login.title') }}
            </router-link>
            <BaseButton
              variant="primary"
              @click="$router.push('/register')"
            >
              {{ $t('auth.register.title') }}
            </BaseButton>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          {{ $t('help.hero.title') }}
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          {{ $t('help.hero.subtitle') }}
        </p>
        
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <MagnifyingGlassIcon class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('help.search.placeholder')"
              class="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @input="filterFAQs"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="py-12 bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <BaseCard 
            class="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer"
            @click="scrollToSection('getting-started')"
          >
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PlayIcon class="w-6 h-6 text-blue-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">
              {{ $t('help.quickLinks.gettingStarted') }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ $t('help.quickLinks.gettingStartedDesc') }}
            </p>
          </BaseCard>
          
          <BaseCard 
            class="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer"
            @click="scrollToSection('account')"
          >
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon class="w-6 h-6 text-green-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">
              {{ $t('help.quickLinks.account') }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ $t('help.quickLinks.accountDesc') }}
            </p>
          </BaseCard>
          
          <BaseCard 
            class="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer"
            @click="scrollToSection('billing')"
          >
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCardIcon class="w-6 h-6 text-purple-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">
              {{ $t('help.quickLinks.billing') }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ $t('help.quickLinks.billingDesc') }}
            </p>
          </BaseCard>
          
          <BaseCard 
            class="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer"
            @click="scrollToSection('technical')"
          >
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cog6ToothIcon class="w-6 h-6 text-orange-600" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">
              {{ $t('help.quickLinks.technical') }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ $t('help.quickLinks.technicalDesc') }}
            </p>
          </BaseCard>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('help.faq.title') }}
          </h2>
          <p class="text-xl text-gray-600">
            {{ $t('help.faq.subtitle') }}
          </p>
        </div>
        
        <!-- FAQ Categories -->
        <div class="space-y-12">
          <!-- Getting Started -->
          <div id="getting-started">
            <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <PlayIcon class="w-6 h-6 text-blue-600 mr-3" />
              {{ $t('help.categories.gettingStarted') }}
            </h3>
            <div class="space-y-4">
              <div 
                v-for="faq in filteredFAQs.gettingStarted" 
                :key="faq.id"
                class="border border-gray-200 rounded-lg"
              >
                <button
                  @click="toggleFAQ(faq.id)"
                  class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span class="font-medium text-gray-900">{{ faq.question }}</span>
                  <ChevronDownIcon 
                    :class="[
                      'w-5 h-5 text-gray-500 transition-transform',
                      openFAQs.includes(faq.id) ? 'rotate-180' : ''
                    ]"
                  />
                </button>
                <div 
                  v-if="openFAQs.includes(faq.id)"
                  class="px-6 pb-4 text-gray-600 border-t border-gray-100"
                >
                  <div class="pt-4" v-html="faq.answer"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Account Management -->
          <div id="account">
            <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <UserIcon class="w-6 h-6 text-green-600 mr-3" />
              {{ $t('help.categories.account') }}
            </h3>
            <div class="space-y-4">
              <div 
                v-for="faq in filteredFAQs.account" 
                :key="faq.id"
                class="border border-gray-200 rounded-lg"
              >
                <button
                  @click="toggleFAQ(faq.id)"
                  class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span class="font-medium text-gray-900">{{ faq.question }}</span>
                  <ChevronDownIcon 
                    :class="[
                      'w-5 h-5 text-gray-500 transition-transform',
                      openFAQs.includes(faq.id) ? 'rotate-180' : ''
                    ]"
                  />
                </button>
                <div 
                  v-if="openFAQs.includes(faq.id)"
                  class="px-6 pb-4 text-gray-600 border-t border-gray-100"
                >
                  <div class="pt-4" v-html="faq.answer"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Billing & Plans -->
          <div id="billing">
            <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CreditCardIcon class="w-6 h-6 text-purple-600 mr-3" />
              {{ $t('help.categories.billing') }}
            </h3>
            <div class="space-y-4">
              <div 
                v-for="faq in filteredFAQs.billing" 
                :key="faq.id"
                class="border border-gray-200 rounded-lg"
              >
                <button
                  @click="toggleFAQ(faq.id)"
                  class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span class="font-medium text-gray-900">{{ faq.question }}</span>
                  <ChevronDownIcon 
                    :class="[
                      'w-5 h-5 text-gray-500 transition-transform',
                      openFAQs.includes(faq.id) ? 'rotate-180' : ''
                    ]"
                  />
                </button>
                <div 
                  v-if="openFAQs.includes(faq.id)"
                  class="px-6 pb-4 text-gray-600 border-t border-gray-100"
                >
                  <div class="pt-4" v-html="faq.answer"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Technical Support -->
          <div id="technical">
            <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Cog6ToothIcon class="w-6 h-6 text-orange-600 mr-3" />
              {{ $t('help.categories.technical') }}
            </h3>
            <div class="space-y-4">
              <div 
                v-for="faq in filteredFAQs.technical" 
                :key="faq.id"
                class="border border-gray-200 rounded-lg"
              >
                <button
                  @click="toggleFAQ(faq.id)"
                  class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span class="font-medium text-gray-900">{{ faq.question }}</span>
                  <ChevronDownIcon 
                    :class="[
                      'w-5 h-5 text-gray-500 transition-transform',
                      openFAQs.includes(faq.id) ? 'rotate-180' : ''
                    ]"
                  />
                </button>
                <div 
                  v-if="openFAQs.includes(faq.id)"
                  class="px-6 pb-4 text-gray-600 border-t border-gray-100"
                >
                  <div class="pt-4" v-html="faq.answer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            {{ $t('help.contact.title') }}
          </h2>
          <p class="text-xl text-gray-600">
            {{ $t('help.contact.subtitle') }}
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Email Support -->
          <BaseCard class="text-center p-8">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <EnvelopeIcon class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t('help.contact.email.title') }}
            </h3>
            <p class="text-gray-600 mb-6">
              {{ $t('help.contact.email.description') }}
            </p>
            <BaseButton variant="outline" @click="sendEmail">
              {{ $t('help.contact.email.action') }}
            </BaseButton>
          </BaseCard>
          
          <!-- Live Chat -->
          <BaseCard class="text-center p-8">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ChatBubbleLeftRightIcon class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t('help.contact.chat.title') }}
            </h3>
            <p class="text-gray-600 mb-6">
              {{ $t('help.contact.chat.description') }}
            </p>
            <BaseButton variant="primary" @click="startChat">
              {{ $t('help.contact.chat.action') }}
            </BaseButton>
          </BaseCard>
          
          <!-- Phone Support -->
          <BaseCard class="text-center p-8">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <PhoneIcon class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              {{ $t('help.contact.phone.title') }}
            </h3>
            <p class="text-gray-600 mb-6">
              {{ $t('help.contact.phone.description') }}
            </p>
            <BaseButton variant="outline" @click="callSupport">
              {{ $t('help.contact.phone.action') }}
            </BaseButton>
          </BaseCard>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  MagnifyingGlassIcon,
  PlayIcon,
  UserIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon
} from '@heroicons/vue/24/outline';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseCard from '@/components/ui/BaseCard.vue';

const { t } = useI18n();

const searchQuery = ref('');
const openFAQs = ref<string[]>([]);

// FAQ Data
const faqs = reactive({
  gettingStarted: [
    {
      id: 'gs-1',
      question: t('help.faq.gettingStarted.q1.question'),
      answer: t('help.faq.gettingStarted.q1.answer')
    },
    {
      id: 'gs-2',
      question: t('help.faq.gettingStarted.q2.question'),
      answer: t('help.faq.gettingStarted.q2.answer')
    },
    {
      id: 'gs-3',
      question: t('help.faq.gettingStarted.q3.question'),
      answer: t('help.faq.gettingStarted.q3.answer')
    },
    {
      id: 'gs-4',
      question: t('help.faq.gettingStarted.q4.question'),
      answer: t('help.faq.gettingStarted.q4.answer')
    }
  ],
  account: [
    {
      id: 'acc-1',
      question: t('help.faq.account.q1.question'),
      answer: t('help.faq.account.q1.answer')
    },
    {
      id: 'acc-2',
      question: t('help.faq.account.q2.question'),
      answer: t('help.faq.account.q2.answer')
    },
    {
      id: 'acc-3',
      question: t('help.faq.account.q3.question'),
      answer: t('help.faq.account.q3.answer')
    },
    {
      id: 'acc-4',
      question: t('help.faq.account.q4.question'),
      answer: t('help.faq.account.q4.answer')
    }
  ],
  billing: [
    {
      id: 'bill-1',
      question: t('help.faq.billing.q1.question'),
      answer: t('help.faq.billing.q1.answer')
    },
    {
      id: 'bill-2',
      question: t('help.faq.billing.q2.question'),
      answer: t('help.faq.billing.q2.answer')
    },
    {
      id: 'bill-3',
      question: t('help.faq.billing.q3.question'),
      answer: t('help.faq.billing.q3.answer')
    },
    {
      id: 'bill-4',
      question: t('help.faq.billing.q4.question'),
      answer: t('help.faq.billing.q4.answer')
    }
  ],
  technical: [
    {
      id: 'tech-1',
      question: t('help.faq.technical.q1.question'),
      answer: t('help.faq.technical.q1.answer')
    },
    {
      id: 'tech-2',
      question: t('help.faq.technical.q2.question'),
      answer: t('help.faq.technical.q2.answer')
    },
    {
      id: 'tech-3',
      question: t('help.faq.technical.q3.question'),
      answer: t('help.faq.technical.q3.answer')
    },
    {
      id: 'tech-4',
      question: t('help.faq.technical.q4.question'),
      answer: t('help.faq.technical.q4.answer')
    }
  ]
});

const filteredFAQs = computed(() => {
  if (!searchQuery.value) {
    return faqs;
  }
  
  const query = searchQuery.value.toLowerCase();
  const filtered: typeof faqs = {
    gettingStarted: [],
    account: [],
    billing: [],
    technical: []
  };
  
  Object.keys(faqs).forEach(category => {
    const categoryKey = category as keyof typeof faqs;
    filtered[categoryKey] = faqs[categoryKey].filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query)
    );
  });
  
  return filtered;
});

const toggleFAQ = (id: string) => {
  const index = openFAQs.value.indexOf(id);
  if (index > -1) {
    openFAQs.value.splice(index, 1);
  } else {
    openFAQs.value.push(id);
  }
};

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const filterFAQs = () => {
  // This function is called on input, filtering is handled by computed property
};

const sendEmail = () => {
  window.location.href = 'mailto:support@cvanalyzer.com';
};

const startChat = () => {
  // Simulate starting a chat
  alert(t('help.contact.chat.comingSoon'));
};

const callSupport = () => {
  window.location.href = 'tel:+1-800-123-4567';
};
</script>