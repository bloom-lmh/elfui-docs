<template>
<!--Hero section-->
  <section id="compare" class="home-compare">
    <div class="hero-section-container">
      <header>
        <a class="logo" href="#compare">Elf<span>UI</span>VSOTHERS</a> <!--Left Section-->

        

        <button class="cta-btn">Donate</button> <!--Right Section-->
      </header>

      <div class="hero-content"> <!--Hero Content-->

        <div class="left-section">
          <div class="left-content-container">
            <table class="compare-table">
              <thead>
                <tr>
                  <th></th>
                  <th><span class="head-pill">ElfUI</span></th>
                  <th>Vue 3</th>
                  <th>React</th>
                  <th>Lit</th>
                  <th>Solid</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>更新模型</th>
                  <td><span class="strong">编译期细粒度</span>，无 VNode</td>
                  <td>运行时 VNode patch</td>
                  <td>运行时 Virtual DOM diff</td>
                  <td>模板字面量 diff</td>
                  <td><span class="strong">编译期细粒度</span>，无 VNode</td>
                </tr>
                <tr>
                  <th>模板语法</th>
                  <td><span class="strong">Vue 风格</span> v-if / v-for / v-model</td>
                  <td><span class="strong">Vue 模板</span></td>
                  <td>JSX</td>
                  <td>tag 函数 + JS 表达式</td>
                  <td>JSX</td>
                </tr>
                <tr>
                  <th>体积(gzip)</th>
                  <td>~10 KB</td>
                  <td>~16 KB</td>
                  <td>~44 KB</td>
                  <td>~6 KB</td>
                  <td>~7 KB</td>
                </tr>
                <tr>
                  <th>组合式 API</th>
                  <td>useRef + useReactive 自动解包 .value</td>
                  <td>ref + reactive</td>
                  <td>useState / useMemo / useEffect</td>
                  <td>无内置</td>
                  <td>createSignal / createEffect</td>
                </tr>
                <tr>
                  <th>输出形式</th>
                  <td><span class="strong">标准 Web Components</span></td>
                  <td>Vue 组件</td>
                  <td>React 组件</td>
                  <td><span class="strong">标准 Web Components</span></td>
                  <td>Solid 组件</td>
                </tr>
                <tr>
                  <th>内置组件</th>
                  <td><span class="strong">全套</span> Teleport / Transition / KeepAlive / Suspense</td>
                  <td><span class="strong">全套</span></td>
                  <td>依赖生态补齐</td>
                  <td>无</td>
                  <td>部分</td>
                </tr>
                <tr>
                  <th>学习门槛</th>
                  <td><span class="blue-text">低</span>，接近 Vue 体验</td>
                  <td>低</td>
                  <td>中</td>
                  <td>中</td>
                  <td>中高</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="right-section">
          <div class="image-wrap">
            <img class="snow-planet" src="/home/planet.png" alt="planet image">
          </div>
        </div>

      </div>

      <div class="social-icons">
        <i class="fa-brands fa-facebook"></i>
        <i class="fa-brands fa-youtube"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-tiktok"></i>
      </div>

    </div>
  </section>
</template>

<style scoped src="./HomeCompare.css"></style>

