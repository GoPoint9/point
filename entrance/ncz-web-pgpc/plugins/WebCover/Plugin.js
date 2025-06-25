import { $t } from '@/languages'
import cover from './cover.js'

// tcg.alert("success", 'message')
// tcg.alert("errors", 'message')
// tcg.warning("error_sync", callback)

/**
  Object.assign(tcg.mc, {
    isSingleWallet: void 0,
    currency: void 0,
    currencySymbol: void 0,
    customerId: void 0,
 */
const tcg = {
  cover (options, callback) {
    const coverInstance = cover
    switch (options.icon) {
      case 'alerts':
        options.icon = 'info'
        break
      case 'errors':
        options.icon = 'error'
        break
    }
    const defaultOptions = {
      icon: 'success',
      title: undefined,
      html: $t('modal_confirm'),
      cover: false,
      timeOut: undefined,
      style: 'font-family: Avenir,"Helvetica Neue",Helvetica,Arial,"Microsoft YaHei",serif\\9;',
    }
    Object.assign(defaultOptions, options)

    const defaultButton = { confirm: $t('button_confirm') }
    if (!defaultOptions.btn || Object.keys(defaultOptions.btn).length === 0) {
      defaultOptions.btn = defaultButton
    }

    defaultOptions.html = `<div style="font-family: inherit; display:inline-block; word-break: break-all; color: inherit; max-width:360px; max-height:70vh; overflow: auto;">${defaultOptions.html}</div>`

    coverInstance.init(defaultOptions, function (action) {
      if (typeof callback === 'function') {
        callback(action === 'confirm')
      }
    })
  },
  alert (icon, message, callback, confirmText = $t('button_confirm')) {
    // let callbackFn = callback
    // if (arguments.length === 3) {
    //   confirmText = callback
    //   callbackFn = null
    // }

    return this.cover({
      html: message,
      icon,
      btn: { confirm: confirmText },
    }, callback)
  },
  warning (errorCode, callback) {
    this.alert('warning', $t(errorCode), callback)
    // NOTE: 看起來沒用，競品也沒用。
    // const dialogBoxIcon = document.getElementById('dialog_box_icon')
    // if (dialogBoxIcon) {
    //   dialogBoxIcon.classList.remove('error')
    //   dialogBoxIcon.classList.add('confirm')
    // }
  },
  onError () {
    return window.cover.init({
    // title: $t('in_popup_prompt'),
      html: $t('in_sure_logout'),
      icon: 'error',
      btn: { confirm: $t('in_increase_submit') },
    }, 'confirmLogout')
  },
}

const Plugin = {
  install (app) {
    window.cover = cover
    window.tcg = tcg
    app.config.globalProperties.$cover = cover
  },
}

export default Plugin

// const showAlert = function(icon, message, callback, context, confirmText) {
//   if (o.parent.cover || o.cover) {
//     return tcg.lib.cover({
//       html: message,
//       icon: icon,
//       btn: { confirm: confirmText }
//     }, context);
//   }

//   if ($("#dialog_box_button input").length === 2) {
//     $("#dialog_box_cancel").trigger("click");
//   } else {
//     $.alerts._hide();
//   }

//   $.alerts.okButton = confirmText ? confirmText : "确定";
//   $.alerts.alert(icon, message, callback, context);
// };

// const handleError = function(errorMessage = "error") {
//   const formattedError = (errorMessage || "").toLowerCase();

//   if (formattedError.includes("hibernate")) {
//     tcg.mc.warning("error_sync");
//     return;
//   }

//   switch ($.trim(errorMessage)) {
//     case "user.or.token.invalid":
//     case "login.not.session":
//     case "CUSTOMER_NOT_LOGIN":
//     case "customer not login or login timeout":
//       showAlert("errors", $t("CUSTOMER_NOT_LOGIN"), function() {
//         const clientParam = sessionStorage.getItem("clientParam");
//         sessionStorage.clear();

//         if (clientParam) {
//           sessionStorage.setItem("clientParam", clientParam);
//         }

//         let redirectPath = "/";
//         if ((window.location.pathname || "").includes("agent")) {
//           redirectPath = window.location.pathname;
//         }

//         window.location.href = redirectPath;
//       });
//       break;
//     default:
//       showAlert("errors", $t(errorMessage));
//   }
// };
