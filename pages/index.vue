<template>
  <div id="smooth-wrapper" class="relative flex flex-col bg-[#111118] w-full h-screen">
    <div id="smooth-content" class="flex-1 overflow-x-hidden overflow-y-auto snap-mandatory snap-y" style="scroll-behavior: smooth; scroll-padding-top: 80px;">
      <!-- Clean Background -->
      <div class="fixed inset-0 bg-[#111118] pointer-events-none"></div>

      <!-- Header -->
      <header class="top-0 right-0 left-0 z-50 fixed bg-[#111118]/95 backdrop-blur-xl border-white/5 border-b">
        <nav class="flex justify-between items-center mx-auto px-6 md:px-12 py-5 max-w-7xl">
          <a href="#home" class="group">
            <h1 class="font-black text-white text-2xl lg:text-3xl tracking-tight">
              NEK<span class="text-purple-500">GAME</span>
            </h1>
          </a>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-8">
            <a href="#home"
              class="font-medium text-white/60 hover:text-white text-sm transition-colors duration-200">Home</a>
            <a href="#games"
              class="font-medium text-white/60 hover:text-white text-sm transition-colors duration-200">Games</a>
            <a href="#about"
              class="font-medium text-white/60 hover:text-white text-sm transition-colors duration-200">About</a>
            <a href="#download"
              class="bg-white hover:bg-white/90 px-5 py-2.5 rounded-full font-semibold text-black text-sm hover:scale-105 transition-all duration-200">
              Download
            </a>
          </div>

          <!-- Mobile Menu Icon -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-purple-400">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </nav>

        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden bg-black/95 backdrop-blur-xl border-purple-500/20 border-t">
          <a v-for="item in ['home', 'games', 'about', 'download']" :key="item" :href="`#${item}`"
            @click="mobileMenuOpen = false"
            class="block hover:bg-purple-500/10 px-6 py-4 font-bold text-white/70 hover:text-purple-400 text-sm uppercase tracking-wider transition-all">
            {{ item }}
          </a>
        </div>
      </header>

      <!-- HERO SECTION - Game Slider -->
      <section id="home" class="relative h-screen min-h-screen overflow-hidden snap-start" data-aos="fade-up" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
        <!-- Background - Lighter with game image -->
        <div class="absolute inset-0 hero-bg" data-speed="0.5">
          <img :src="featuredGames[currentSlide].image" :alt="featuredGames[currentSlide].title"
            class="w-full h-full object-cover transition-all duration-1000" :key="currentSlide" />
          <!-- Overlay chỉ tối bên trái để text đọc được -->
          <div class="absolute inset-0 bg-gradient-to-r from-[#111118] via-[#111118]/80 to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-[#111118]/30"></div>
        </div>

        <!-- Slider Content -->
        <div class="z-10 relative flex items-center gap-8 min-h-screen snap-start" data-aos="fade-up">
          <div class="mx-auto px-6 md:px-12 pt-8 w-full max-w-7xl">
            <div class="items-center gap-8 grid grid-cols-1 lg:grid-cols-2">
              <!-- Left: Game Info -->
              <div class="space-y-6 hero-content" data-aos="fade-right" data-aos-delay="100">
                <!-- Game Badge -->
                <div class="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span class="bg-green-500 rounded-full w-2 h-2"></span>
                  <span class="font-medium text-white text-sm">Featured Game</span>
                </div>

                <!-- Title -->
                <h1 class="font-black text-white text-4xl md:text-6xl lg:text-7xl leading-tight">
                  {{ featuredGames[currentSlide].title }}
                </h1>

                <!-- Description -->
                <p class="max-w-xl font-light text-white/80 text-lg md:text-xl leading-relaxed">
                  {{ featuredGames[currentSlide].description }}
                </p>

                <!-- Rating & Stats -->
                <div class="flex flex-wrap items-center gap-6">
                  <!-- Rating -->
                  <div class="flex items-center gap-2">
                    <div class="flex gap-1">
                      <svg v-for="star in 5" :key="star" class="w-6 h-6"
                        :class="star <= featuredGames[currentSlide].rating ? 'text-yellow-400' : 'text-gray-600'"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <span class="font-bold text-white text-lg">{{ featuredGames[currentSlide].rating }}.0</span>
                    <span class="text-white/50">({{ featuredGames[currentSlide].downloads }})</span>
                  </div>

                  <!-- Downloads -->
                  <div class="flex items-center gap-2 text-white/70">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>{{ featuredGames[currentSlide].downloads }} lượt tải</span>
                  </div>
                </div>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2">
                  <span v-for="(tag, tagIndex) in featuredGames[currentSlide].tags" :key="tagIndex"
                    class="bg-white/10 backdrop-blur-sm px-4 py-2 border border-white/10 rounded-full font-medium text-white/80 text-sm">
                    {{ tag }}
                  </span>
                </div>

                <!-- Download Buttons -->
                <div class="flex flex-wrap gap-4 pt-4">
                  <a href="#"
                    class="group relative flex items-center gap-3 hover:shadow-2xl hover:shadow-white/20 transition-all duration-500 download-btn">
                    <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                      alt="download game" class="h-14">
                  </a>

                  <a href="#"
                    class="group relative flex items-center gap-3 hover:shadow-2xl hover:shadow-white/20 transition-all duration-500 download-btn">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="download game" class="h-14">
                  </a>
                </div>
              </div>
              <div class="hidden lg:flex justify-center items-center !translate-y-0 hero-image" data-aos="fade-left" data-aos-delay="200">
                <div class="relative">
                  <!-- Phone Mockup - Pure Clean Design -->
                  <div class="relative bg-black rounded-[2.5rem] w-[300px] aspect-[9/18]">
                    <!-- Phone Frame -->
                    <div class="relative bg-[#1a1a1a] rounded-[2.3rem] w-full h-full overflow-hidden">
                      <!-- Screen -->
                      <div class="absolute inset-[8px] rounded-[2rem] overflow-hidden">
                        <img :src="featuredGames[currentSlide].image" :alt="featuredGames[currentSlide].title"
                          class="w-full h-full object-cover transition-all duration-700" :key="currentSlide" />
                      </div>
                      <!-- Notch -->
                      <div class="top-[15px] left-1/2 absolute bg-black rounded-full w-20 h-5 -translate-x-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Slider Controls -->
            <div class="flex justify-between items-center mt-8">
              <!-- Left Arrow -->
              <button @click="prevSlide" class="hidden md:flex justify-center items-center bg-white/10 hover:bg-white/20 p-3 rounded-full hover:scale-110 transition-all duration-300">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <!-- Dots -->
              <div class="flex items-center gap-3">
                <button v-for="(game, index) in featuredGames" :key="index" @click="goToSlide(index)"
                  class="group relative slider-dot">
                  <div :class="[
                    'h-2 rounded-full transition-all duration-300',
                    currentSlide === index
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/30 group-hover:bg-white/50'
                  ]"></div>
                </button>
              </div>

              <!-- Right Arrow -->
              <button @click="nextSlide" class="hidden md:flex justify-center items-center bg-white/10 hover:bg-white/20 p-3 rounded-full hover:scale-110 transition-all duration-300">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>


          </div>
        </div>
      </section>

      <!-- GAMES SECTION -->
      <section id="games" class="relative flex flex-col justify-center items-center bg-gradient-to-br from-[#0d0d12] via-[#1a1a2e] to-[#0d0d12] px-4 md:px-8 py-24 min-h-screen overflow-hidden">
        <!-- Background decoration -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="-top-40 -left-40 absolute bg-purple-900/10 blur-3xl rounded-full w-80 h-80"></div>
          <div class="-right-40 -bottom-40 absolute bg-blue-900/10 blur-3xl rounded-full w-80 h-80"></div>
        </div>
        <div class="z-10 relative mx-auto w-full max-w-7xl" data-aos="fade-up" data-aos-delay="100">
          <div class="mb-16 text-center">
            <span class="block mb-4 font-semibold text-purple-400 text-sm uppercase tracking-wider">Our
              Collection</span>
            <h2 class="mb-4 font-bold text-white text-4xl md:text-5xl lg:text-6xl">
              Featured Games
            </h2>
            <p class="mx-auto max-w-2xl text-white/50 text-lg">
              Trải nghiệm những tựa game đỉnh cao được hàng triệu người chơi yêu thích
            </p>
          </div>

          <!-- Games Grid - Modern Clean Style -->
          <div class="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" data-aos="fade-up" data-aos-delay="200">
            <div v-for="(game, index) in featuredGames" :key="index"
              class="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
              :data-speed="1 + index * 0.1"
              data-aos="fade-up"
              :data-aos-delay="300 + index * 100">
              <!-- Game Image -->
              <div class="relative h-56 overflow-hidden">
                <img :src="game.image" :alt="game.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                <!-- Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent"></div>

                <!-- Rating Badge -->
                <div class="top-4 right-4 absolute">
                  <div class="flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <svg class="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span class="font-semibold text-white text-xs">{{ game.rating }}.0</span>
                  </div>
                </div>

                <!-- Hover Overlay -->
                <div
                  class="absolute inset-0 flex flex-col justify-center items-center gap-3 bg-black/80 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-300">
                  <span class="mb-2 font-semibold text-white text-lg">Download Now</span>

                  <!-- App Store -->
                  <a href="#"
                    class="flex justify-center items-center gap-2 bg-white hover:bg-white/90 px-5 py-2.5 rounded-xl w-40 font-medium text-black text-sm transition-colors">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    App Store
                  </a>

                  <!-- Google Play -->
                  <a href="#"
                    class="flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-2.5 border border-white/20 rounded-xl w-40 font-medium text-white text-sm transition-colors">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    Google Play
                  </a>
                </div>
              </div>

              <!-- Game Info -->
              <div class="p-5">
                <h3 class="mb-2 font-bold text-white group-hover:text-purple-400 text-lg transition-colors">
                  {{ game.title }}
                </h3>

                <p class="mb-4 text-white/50 text-sm line-clamp-2">{{ game.description }}</p>

                <!-- Tags & Downloads -->
                <div class="flex justify-between items-center">
                  <div class="flex flex-wrap gap-2">
                    <span v-for="(tag, tagIndex) in game.tags.slice(0, 2)" :key="tagIndex"
                      class="bg-white/5 px-3 py-1 rounded-full font-medium text-white/60 text-xs">
                      {{ tag }}
                    </span>
                  </div>
                  <span class="text-white/40 text-xs">{{ game.downloads }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ABOUT SECTION -->
      <section id="about" class="relative flex flex-col justify-center items-center bg-gradient-to-br from-[#111118] via-[#1a1a2e] to-[#111118] px-4 md:px-8 py-24 min-h-screen overflow-hidden snap-start" data-aos="fade-up">
        <!-- Background decoration -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="top-1/2 left-1/4 absolute bg-cyan-900/10 blur-3xl rounded-full w-96 h-96"></div>
          <div class="right-1/4 bottom-1/4 absolute bg-purple-900/10 blur-3xl rounded-full w-96 h-96"></div>
        </div>
        <div class="z-10 relative mx-auto w-full max-w-7xl" data-aos="fade-up" data-aos-delay="100">
          <div class="items-center gap-12 grid grid-cols-1 lg:grid-cols-2">
            <!-- Left: Image/Video -->
            <div class="relative" data-aos="fade-right" data-aos-delay="100">
              <div class="relative rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&h=600&fit=crop"
                  alt="Gaming Setup" class="w-full h-[400px] object-cover" />
                <div class="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-blue-600/30"></div>
              </div>

              <!-- Floating Stats -->
              <div
                class="-right-6 -bottom-6 absolute bg-white/5 backdrop-blur-xl p-6 border border-white/10 rounded-2xl">
                <div class="text-center">
                  <div class="font-bold text-white text-4xl">10M+</div>
                  <div class="text-white/50 text-sm">NGƯỜI CHƠI</div>
                </div>
              </div>
            </div>

            <!-- Right: Content -->
            <div class="space-y-6" data-aos="fade-left" data-aos-delay="200">
              <span class="font-semibold text-purple-400 text-sm uppercase tracking-wider">About Us</span>
              <h2 class="font-bold text-white text-4xl md:text-5xl">
                VỀ CHÚNG TÔI
              </h2>

              <p class="text-white/80 text-lg leading-relaxed">
                <strong class="text-purple-400">NEKGAME STUDIO</strong> là một trong những
                studio game hàng đầu, chuyên phát triển các tựa game mobile chất lượng cao
                với đồ họa tuyệt đẹp và gameplay độc đáo.
              </p>

              <p class="text-white/70 text-lg leading-relaxed">
                Với đội ngũ phát triển giàu kinh nghiệm và đam mê, chúng tôi cam kết
                mang đến những trải nghiệm gaming tốt nhất cho hàng triệu người chơi
                trên toàn thế giới.
              </p>

              <!-- Features -->
              <div class="gap-4 grid grid-cols-1 md:grid-cols-2 pt-6">
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 bg-purple-600/20 p-3 rounded-lg">
                    <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-white">Chất Lượng Cao</h4>
                    <p class="text-white/60 text-sm">Đồ họa 3D đỉnh cao</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 bg-blue-600/20 p-3 rounded-lg">
                    <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-white">Mượt Mà</h4>
                    <p class="text-white/60 text-sm">60FPS gameplay</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 bg-cyan-600/20 p-3 rounded-lg">
                    <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-white">Cộng Đồng</h4>
                    <p class="text-white/60 text-sm">10M+ người chơi</p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0 bg-pink-600/20 p-3 rounded-lg">
                    <svg class="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-white">Cập Nhật</h4>
                    <p class="text-white/60 text-sm">Nội dung mới hàng tuần</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- DOWNLOAD SECTION -->
      <section id="download" class="relative flex flex-col justify-center items-center bg-gradient-to-br from-[#0d0d12] via-[#2d1b4e] to-[#0d0d12] px-4 md:px-8 py-24 min-h-screen overflow-hidden snap-start" data-aos="fade-up">
        <!-- Background decoration -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="-top-32 -right-32 absolute bg-pink-900/10 blur-3xl rounded-full w-96 h-96"></div>
          <div class="-bottom-32 -left-32 absolute bg-purple-900/10 blur-3xl rounded-full w-96 h-96"></div>
        </div>
        <div class="z-10 relative mx-auto w-full max-w-5xl text-center" data-aos="fade-up" data-aos-delay="100">
          <span class="block mb-4 font-semibold text-purple-400 text-sm uppercase tracking-wider">Get Started</span>
          <h2 class="mb-6 font-bold text-white text-4xl md:text-5xl">
            TẢI GAME NGAY
          </h2>

          <p class="mx-auto mb-12 max-w-2xl text-white/70 text-lg md:text-xl">
            Tải game miễn phí trên iOS và Android để trải nghiệm ngay hôm nay
          </p>

          <!-- Download Image Badges (Alternative Style) -->
          <div class="flex md:flex-row flex-col justify-center items-center gap-4 mb-16">
            <a href="#" class="hover:scale-105 transition-transform">
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on App Store" class="h-14" />
            </a>
            <a href="#" class="hover:scale-105 transition-transform">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play" class="h-14" />
            </a>
          </div>

          <!-- Social Proof -->
          <div class="gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto mt-16 max-w-4xl">
            <div class="text-center">
              <div class="font-black text-purple-400 text-3xl md:text-4xl">10M+</div>
              <div class="text-white/60 text-sm">Lượt tải</div>
            </div>
            <div class="text-center">
              <div class="font-black text-blue-400 text-3xl md:text-4xl">4.8</div>
              <div class="text-white/60 text-sm">Đánh giá</div>
            </div>
            <div class="text-center">
              <div class="font-black text-cyan-400 text-3xl md:text-4xl">150K+</div>
              <div class="text-white/60 text-sm">Review</div>
            </div>
            <div class="text-center">
              <div class="font-black text-pink-400 text-3xl md:text-4xl">50+</div>
              <div class="text-white/60 text-sm">Quốc gia</div>
            </div>
          </div>
        </div>
      </section>

      <!-- TESTIMONIALS SECTION -->
      <section class="relative flex flex-col justify-center items-center px-4 md:px-8 py-24 min-h-screen snap-start testimonials-section" data-aos="fade-up">
        <div class="z-10 relative mx-auto w-full max-w-7xl" data-aos="fade-up" data-aos-delay="100">
          <div class="mb-16 text-center">
            <span class="block mb-4 font-semibold text-purple-400 text-sm uppercase tracking-wider">Người Dùng Nói Gì</span>
            <h2 class="mb-4 font-bold text-white text-4xl md:text-5xl lg:text-6xl">
              Đánh Giá Từ Cộng Đồng
            </h2>
            <p class="mx-auto max-w-2xl text-white/50 text-lg">
              Hàng triệu game thủ đã yêu thích các tựa game của chúng tôi
            </p>
          </div>

          <div class="gap-8 grid grid-cols-1 md:grid-cols-3">
            <!-- Testimonial 1 -->
            <div class="bg-white/[0.03] hover:bg-white/[0.06] p-8 border border-white/5 hover:border-white/10 rounded-2xl transition-all duration-300" data-aos="fade-up" data-aos-delay="150">
              <div class="flex gap-1 mb-4">
                <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <p class="mb-6 text-white/80 leading-relaxed">"Game của NEKGAME thực sự tuyệt vời! Đồ họa sắc nét, gameplay mượt mà và cộng đồng rất thân thiện."</p>
              <div class="flex items-center gap-3">
                <img src="https://i.pravatar.cc/150?img=1" alt="User" class="rounded-full w-12 h-12">
                <div>
                  <h4 class="font-bold text-white">Nguyễn Văn A</h4>
                  <p class="text-white/50 text-sm">Hà Nội, Việt Nam</p>
                </div>
              </div>
            </div>

            <!-- Testimonial 2 -->
            <div class="bg-white/[0.03] hover:bg-white/[0.06] p-8 border border-white/5 hover:border-white/10 rounded-2xl transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
              <div class="flex gap-1 mb-4">
                <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <p class="mb-6 text-white/80 leading-relaxed">"Tôi đã chơi nhiều game mobile, nhưng các tựa game của NEKGAME vẫn là tốt nhất. Rất đáng giá!"</p>
              <div class="flex items-center gap-3">
                <img src="https://i.pravatar.cc/150?img=2" alt="User" class="rounded-full w-12 h-12">
                <div>
                  <h4 class="font-bold text-white">Trần Thị B</h4>
                  <p class="text-white/50 text-sm">Sài Gòn, Việt Nam</p>
                </div>
              </div>
            </div>

            <!-- Testimonial 3 -->
            <div class="bg-white/[0.03] hover:bg-white/[0.06] p-8 border border-white/5 hover:border-white/10 rounded-2xl transition-all duration-300" data-aos="fade-up" data-aos-delay="250">
              <div class="flex gap-1 mb-4">
                <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <p class="mb-6 text-white/80 leading-relaxed">"Không thể ngừng chơi! Mỗi ngày có cảm giác muốn mở game lên và tiếp tục cuộc phiêu lưu của mình."</p>
              <div class="flex items-center gap-3">
                <img src="https://i.pravatar.cc/150?img=3" alt="User" class="rounded-full w-12 h-12">
                <div>
                  <h4 class="font-bold text-white">Lê Văn C</h4>
                  <p class="text-white/50 text-sm">Đà Nẵng, Việt Nam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- STATS SECTION -->
      <section class="relative flex flex-col justify-center items-center bg-[#0d0d12] px-4 md:px-8 py-24 min-h-screen snap-start stats-section" data-aos="fade-up">
        <div class="z-10 relative mx-auto w-full max-w-7xl">
          <div class="mb-16 text-center" data-aos="fade-up" data-aos-delay="100">
            <span class="block mb-4 font-semibold text-purple-400 text-sm uppercase tracking-wider">Thống Kê</span>
            <h2 class="mb-4 font-bold text-white text-4xl md:text-5xl lg:text-6xl">
              Những Con Số Ấn Tượng
            </h2>
          </div>

          <div class="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div class="text-center" data-aos="fade-up" data-aos-delay="150">
              <div class="bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3 font-black text-transparent text-6xl md:text-7xl">10M+</div>
              <p class="text-white/60 text-lg">Người Chơi Hoạt Động</p>
            </div>
            <div class="text-center" data-aos="fade-up" data-aos-delay="200">
              <div class="bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-3 font-black text-transparent text-6xl md:text-7xl">50+</div>
              <p class="text-white/60 text-lg">Quốc Gia & Khu Vực</p>
            </div>
            <div class="text-center" data-aos="fade-up" data-aos-delay="250">
              <div class="bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-3 font-black text-transparent text-6xl md:text-7xl">200+</div>
              <p class="text-white/60 text-lg">Tựa Game Lựa Chọn</p>
            </div>
            <div class="text-center" data-aos="fade-up" data-aos-delay="300">
              <div class="bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-3 font-black text-transparent text-6xl md:text-7xl">4.9★</div>
              <p class="text-white/60 text-lg">Đánh Giá Trung Bình</p>
            </div>
          </div>
        </div>
      </section>


      <footer class="relative bg-black/80 backdrop-blur-xl px-4 md:px-8 py-12 border-purple-500/20 border-t snap-start" data-aos="fade-up" data-aos-delay="100">
        <div class="mx-auto max-w-7xl" data-aos="fade-up" data-aos-delay="200">
          <div class="gap-8 grid grid-cols-1 md:grid-cols-4 mb-8">
            <!-- Company Info -->
            <div class="md:col-span-2">
              <h3
                class="bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4 font-black text-transparent text-2xl">
                NEKGAME STUDIO
              </h3>
              <p class="mb-4 text-white/60">
                Tạo ra những trải nghiệm game tuyệt vời cho hàng triệu người chơi trên toàn thế giới.
              </p>
              <!-- Social Links -->
              <div class="flex gap-4">
                <a href="#" class="bg-purple-600/20 hover:bg-purple-600/40 p-2 rounded-lg transition-all">
                  <svg class="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" class="bg-blue-600/20 hover:bg-blue-600/40 p-2 rounded-lg transition-all">
                  <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" class="bg-pink-600/20 hover:bg-pink-600/40 p-2 rounded-lg transition-all">
                  <svg class="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
                <a href="#" class="bg-red-600/20 hover:bg-red-600/40 p-2 rounded-lg transition-all">
                  <svg class="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <h4 class="mb-4 font-bold text-white">Quick Links</h4>
              <ul class="space-y-2">
                <li><a href="#home" class="text-white/60 hover:text-purple-400 transition-colors">Home</a></li>
                <li><a href="#games" class="text-white/60 hover:text-purple-400 transition-colors">Games</a></li>
                <li><a href="#about" class="text-white/60 hover:text-purple-400 transition-colors">About</a></li>
                <li><a href="#download" class="text-white/60 hover:text-purple-400 transition-colors">Download</a></li>
              </ul>
            </div>

            <!-- Support -->
            <div>
              <h4 class="mb-4 font-bold text-white">Support</h4>
              <ul class="space-y-2">
                <li><a href="#" class="text-white/60 hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="#" class="text-white/60 hover:text-purple-400 transition-colors">Contact Us</a></li>
                <li><a href="#" class="text-white/60 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" class="text-white/60 hover:text-purple-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <!-- Copyright -->
          <div class="pt-8 border-purple-500/20 border-t text-center">
            <p class="text-white/40">
              &copy; 2025 NEKGAME STUDIO. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobileMenuOpen: false,
      currentSlide: 0,
      slideInterval: null,
      touchStartX: 0,
      touchEndX: 0,
      featuredGames: [
        {
          title: "Battle Royale Elite",
          description: "Game bắn súng sinh tồn đỉnh cao với đồ họa tuyệt đẹp và gameplay hấp dẫn. Chiến đấu với 100 người chơi khác trong trận chiến sinh tồn khốc liệt.",
          image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=800&fit=crop",
          tags: ["Action", "Multiplayer", "Shooter"],
          rating: 5,
          downloads: "5M+"
        },
        {
          title: "Fantasy Quest",
          description: "Nhập vai phiêu lưu thế giới mở với kỹ năng phép thuật và nhiệm vụ đa dạng. Khám phá vùng đất huyền bí và chiến đấu với quái vật.",
          image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=1200&h=800&fit=crop",
          tags: ["RPG", "Adventure", "Magic"],
          rating: 5,
          downloads: "3M+"
        },
        {
          title: "Speed Legends",
          description: "Đua xe tốc độ cao với hàng trăm siêu xe và đường đua khắp thế giới. Tùy chỉnh xe và cạnh tranh với người chơi toàn cầu.",
          image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop",
          tags: ["Racing", "Sports", "Simulation"],
          rating: 4,
          downloads: "2M+"
        },
        {
          title: "Puzzle Master",
          description: "Giải đố thông minh với hơn 1000 màn chơi thử thách trí não. Mỗi level là một thử thách mới đầy thú vị.",
          image: "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=1200&h=800&fit=crop",
          tags: ["Puzzle", "Casual", "Brain"],
          rating: 5,
          downloads: "8M+"
        },
        {
          title: "Tower Defense Pro",
          description: "Bảo vệ căn cứ với chiến thuật và nâng cấp tháp phòng thủ đa dạng. Xây dựng đội quân và chống lại hàng ngàn kẻ thù.",
          image: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=1200&h=800&fit=crop",
          tags: ["Strategy", "Defense", "Tower"],
          rating: 4,
          downloads: "1.5M+"
        },
        {
          title: "Space Shooter",
          description: "Bắn tàu vũ trụ với đồ họa neon và âm thanh điện tử sống động. Khám phá vũ trụ và tiêu diệt kẻ thù ngoài hành tinh.",
          image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=1200&h=800&fit=crop",
          tags: ["Arcade", "Shooter", "Sci-Fi"],
          rating: 5,
          downloads: "4M+"
        }
      ]
    };
  },
  mounted() {
    this.initGSAP();
    this.startAutoSlide();
    // Refresh AOS after component mounted
    this.$nextTick(() => {
      if (process.client && window.AOS) {
        window.AOS.refresh();
      }
    });
  },
  beforeDestroy() {
    this.stopAutoSlide();
  },
  updated() {
    // Refresh AOS when component updates
    if (process.client && window.AOS) {
      window.AOS.refresh();
    }
  },
  methods: {
    initGSAP() {
      // GSAP scroll animations removed to support snap scrolling
      // Add hover animations and load animations
      if (typeof gsap !== 'undefined') {
        // Animate game cards on load
        gsap.from('.group.relative.bg-white', {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out'
        });

        // Add hover effect to feature cards
        document.querySelectorAll('.bg-white\\/\\[0\\.03\\]').forEach(card => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -5,
              duration: 0.3,
              ease: 'power2.out'
            });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        });

        // Animate background blobs
        gsap.to('.bg-purple-900\\/10, .bg-blue-900\\/10, .bg-cyan-900\\/10, .bg-pink-900\\/10', {
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          x: (i, target) => gsap.utils.random(-30, 30),
          y: (i, target) => gsap.utils.random(-30, 30)
        });
      }
    },
    startAutoSlide() {
      this.slideInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    },
    stopAutoSlide() {
      if (this.slideInterval) {
        clearInterval(this.slideInterval);
      }
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.featuredGames.length;
    },
    prevSlide() {
      this.currentSlide = this.currentSlide === 0
        ? this.featuredGames.length - 1
        : this.currentSlide - 1;
    },
    goToSlide(index) {
      this.currentSlide = index;
      this.stopAutoSlide();
      this.startAutoSlide();
    },
    handleTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX;
    },
    handleTouchEnd(e) {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    },
    handleSwipe() {
      const swipeThreshold = 50;
      const diff = this.touchStartX - this.touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Vuốt từ phải sang trái - next slide
          this.nextSlide();
        } else {
          // Vuốt từ trái sang phải - prev slide
          this.prevSlide();
        }
        this.stopAutoSlide();
        this.startAutoSlide();
      }
    }
  },
  head() {
    return {
      title: "NEKGAME STUDIO - Game Studio Hàng Đầu",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "NEKGAME STUDIO - Khám phá thế giới game đỉnh cao với đồ họa tuyệt đẹp và gameplay hấp dẫn"
        }
      ]
    };
  }
};
</script>

<style scoped>
/* Smooth Scroll */
html {
  scroll-behavior: smooth;
}

/* Smooth wrapper for GSAP ScrollSmoother */
#smooth-wrapper {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

#smooth-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
  -webkit-overflow-scrolling: touch;
}

/* Snap all sections */
section,
footer {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* Smooth transitions for all snap sections */
section[data-aos],
footer[data-aos] {
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Hero section styles */
.hero-bg img {
  transition: transform 1s ease-out, opacity 0.8s ease;
}

/* Download button hover */
.download-btn {
  transform: translateY(0);
}

.download-btn:hover {
  transform: translateY(-2px);
}

/* Slider transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

/* Smooth transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced smooth scroll behavior */
html, body {
  scroll-behavior: smooth;
}

/* Reduce motion for animations */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

/* Focus states */
button:focus-visible,
a:focus-visible {
  outline: 2px solid #a855f7;
  outline-offset: 2px;
}

/* Clean scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #111118;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.25);
}
</style>
