<template>
  <nav class="sticky-top">
    <div class="login-bar text-right d-none d-lg-block">
      <div class="container d-flex">
        <i class="login-indicator mx-2 " />
        <a href="javascript:void(0)">
          登入&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;註冊
        </a>
      </div>
    </div>
    <div class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <a href="javascript:void(0)" class="navbar-brand">
          <img
            src="https://cdn.tecyt.com/img/epplogo/logo_ep-rectangle-whandbk-nobg-sm.png"
            height="48"
            title="Easy Point"
            alt="Easy Point logo"
          >
        </a>
        <div class="navbar-nav ml-auto d-lg-none">
          <a class="nav-link cart" href="javascript:void(0)">
            <i class="fas fa-shopping-cart" />
            <span class="badge invisible">
              0
            </span>
          </a>
        </div>
        <button
          class="navbar-toggler border-0"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars" />
        </button>
        <div id="navbarSupportedContent" class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto text-center">
            <li class="nav-item">
              <a class="nav-link" href="javascript:void(0)">
                <i class="fab fa-facebook" />
                粉絲團
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:void(0)">
                購買商品
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="javascript:void(0)">
                關於我們
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:void(0)">
                訂單查詢
              </a>
            </li>
            <li class="nav-item d-lg-none">
              <a class="nav-link" href="javascript:void(0)">
                登入 / 註冊
              </a>
            </li>
          </ul>
        </div>
        <div class="navbar-nav d-none d-lg-block">
          <a class="nav-link cart" href="javascript:void(0)">
            <i class="fas fa-shopping-cart" />
            <span class="badge invisible">
              0
            </span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
