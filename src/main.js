const $siteList = $('.siteList')
const $addWeb = $('.addWeb')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'aliyun', logoType: 'svgSelf', url: 'https://www.aliyun.com/' },
    { logo: 'bilibili', logoType: 'svgSelf', url: 'https://www.bilibili.com/' },
    { logo: 'cndblogs', logoType: 'svgSelf', url: 'https://www.cnblogs.com/' },
    { logo: 'GitHub', logoType: 'svgSelf', url: 'https://github.com/' },
    { logo: 'Stackoverflow', logoType: 'svgSelf', url: 'https://stackoverflow.com/' },
    { logo: 'Leetcode', logoType: 'svgSelf', url: 'https://leetcode-cn.com/' },
    { logo: 'zhihu', logoType: 'svgSelf', url: 'https://www.zhihu.com/' },
]

const simplifyUrl = (url) => {
    return url.replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
        .replace('.com', '')
        .replace('.cn', '')
}

const render = () => {
    $siteList.find('li:not(.addWeb)').remove()
    hashMap.forEach((node, index) => {
        if (node.logoType === 'svgSelf') {
            let $li = $(`
            <li>

                    <div class="site">
                        <div class="logo">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-${(node.logo).toLowerCase()}"></use>
                            </svg>
                        </div>
                        <dig class="link">${node.logo}</dig>
                        <div class="delete">
                            <svg class="icon" >
                                <use xlink:href="#icon-delete"></use>
                            </svg>
                        </div>
                    </div>
                
            </li>
            `).insertBefore($addWeb)
            $li.on('click', () => {
                window.open(node.url)
            })
            $li.on('click', '.delete', (e) => {
                e.stopPropagation() //阻止冒泡
                hashMap.splice(index, 1)
                render()
            })
        } else {
            let $li = $(`
            <li>
 
                    <div class="site">
                        <div class="logo">
                            ${simplifyUrl(node.url)[0].toUpperCase()}
                        </div>
                        <dig class="link">${simplifyUrl(node.url)}</dig>
                        <div class="delete">
                        <svg class="icon" >
                            <use xlink:href="#icon-delete"></use>
                        </svg>
                    </div>
                    </div>

            </li>
            `).insertBefore($addWeb)
            $li.on('click', () => {
                window.open(node.url)
            })
            $li.on('click', '.delete', (e) => {
                e.stopPropagation() //阻止冒泡
                hashMap.splice(index, 1)

                render()
            })
        }


    })

}
render()
$('.addButton').on('click', () => {

    console.log('123')
    let url = window.prompt(
        '请输入你要添加的网址'
    )

    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)

    hashMap.push({
        logo: simplifyUrl(url)[0],
        logoType: 'text',
        url: url
    })

    render()
    // const $li = $(`
    //           <li>       
    //               <a href="${url}">
    //                 <div class="site">
    //                     <div class="logo">
    //                         ${url[0]}
    //                     </div>
    //                     <dig class="link">${url}</dig>
    //                 </div>     
    //              </a>
    //          </li>`).insertBefore('.addWeb')
})
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    let { key } = e
    hashMap.forEach((node) => {
        if (node.logo.toLowerCase()[0] === key) {
            window.open(node.url)
        }
    })
})

console.log(hashMap)
console.log(xObject)
$(document).on('keypress', (e) => {
    let { key } = e
    console.log(key)
        xObject.forEach(node => {
            if (node.logo === key) {
                window.open(node.url)
            }
        })
})

// for(let i = 0;i <hashMap.length|| xObject.length;i++){
//     if(hashMap[i].logo.toLowerCase()[0]===key){
//         window.open(hashMap[i].url)
//     }else if(xObject[i].logo.toLowerCase()[0]===key){
//         window.open(xObject[i].url)
//     }
// }
render()