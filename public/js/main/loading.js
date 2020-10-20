class Loading {
    element = document.createElement('div');
    fontSize = 40;
    isEnableBackground = true;

    constructor(element,fontSize,isEnableBackground) {
        this.element = element;
        this.fontSize = fontSize || this.fontSize;
        this.isEnableBackground = isEnableBackground || this.isEnableBackground;
    }

    showLoadingElement() {
        if (this.element.style.position === 'relative') return null;

        const backgroundElement = this.createBackgroundElement(this.isEnableBackground);
        const icon = this.createIcon(this.fontSize);

        this.element.style.position = 'relative';

        this.element.append(backgroundElement);
        this.element.append(icon);
    }

    hideLoadingElement() {
        this.element.style.removeProperty('position');

        const backgroundElement = document.getElementsByClassName('bg-blurred')[0];
        const icon = document.getElementsByClassName('div-icon')[0]; 

        backgroundElement?.remove();
        icon?.remove();
    }

    createBackgroundElement(isEnableBackground) {
        const backgroundElement = document.createElement("div");

        backgroundElement.className = 'bg-blurred';

        backgroundElement.style.width = '100%';
        backgroundElement.style.height = '100%';
        backgroundElement.style.position = 'absolute';
        backgroundElement.style.top = '50%';
        backgroundElement.style.left = '50%';
        backgroundElement.style.transform = 'translateX(-50%) translateY(-50%)';

        if (isEnableBackground) {
            backgroundElement.style.background = 'rgb(0 0 0 / 30%)';
        }

        return backgroundElement;
    }

    createIcon(fontSize) {
        const divIcon = document.createElement("div");
        const icon = document.createElement("i");

        icon.className = 'fa fa-spinner fa-spin fa-fw';

        divIcon.className = 'div-icon';

        divIcon.style.fontSize = fontSize;
        divIcon.style.position = 'absolute';
        divIcon.style.top = '50%';
        divIcon.style.left = '50%';
        divIcon.style.transform = 'translateX(-50%) translateY(-50%)';

        divIcon.append(icon);

        return divIcon
    }
}