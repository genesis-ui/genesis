function getVersion() {
    const versionString = window?.React?.version;

    const isPresent = versionString !== null;

    if (!isPresent) {
        return {
            is_present: isPresent
        };
    }

    const versionParts = versionString.split('-');

    const versionHash = versionParts[1] + '-' + versionParts[2];

    const versions = versionParts[0].split('.');

    const majorVersion = versions[0];

    const minorVersion = versions[1] + '.' + versions[2];

    return {
        is_present: isPresent,
        major: Number(majorVersion),
        minor: minorVersion,
        versions: versions,
        hash: versionHash,
        raw: versionString,
    };
}

export default getVersion();