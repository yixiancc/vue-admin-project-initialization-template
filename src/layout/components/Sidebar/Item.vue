<script>
export default {
    name: 'MenuItem',
    functional: true,
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        img: {
            type: String,
            default: ''
        }
    },
    render(createElement, context) {
        const {icon, title, img} = context.props
        const vnodes = []
        if (icon) {
            const elHtml = createElement('i', {
                attrs: {
                    'class': icon
                }
            })
            vnodes.push(elHtml)
        } else if (img) {
            const elHtml = createElement('img', {
                attrs: {
                    'src': img
                }
            })
            vnodes.push(elHtml)
        }
        if (title) {
            const elHtml = createElement('span', {
                attrs: {
                    slot: title
                }
            }, title)
            vnodes.push(elHtml)
        }
        return vnodes
    }
}
</script>

<style scoped>
.sub-el-icon {
    color: currentColor;
    width: 1em;
    height: 1em;
}
</style>
