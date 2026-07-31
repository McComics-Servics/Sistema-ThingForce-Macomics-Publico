[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [Parameter(Mandatory = $true)]
    [string]$DependencySource,

    [string]$PluginRoot = (Join-Path $PSScriptRoot '..\..\..\..'),

    [string]$TargetRelativePath = 'modules\estructura_pro\native-capture',

    [switch]$Force
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Resolve-CaptureDependencySource {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    $resolvedPath = (Resolve-Path -LiteralPath $Path).Path
    if (-not (Test-Path -LiteralPath $resolvedPath -PathType Container)) {
        throw "La ruta indicada no es una carpeta valida: $Path"
    }

    $leaf = Split-Path -Leaf $resolvedPath
    if ($leaf -in @('native', 'native-capture')) {
        return $resolvedPath
    }

    foreach ($candidateName in @('native', 'native-capture')) {
        $candidatePath = Join-Path $resolvedPath $candidateName
        if (Test-Path -LiteralPath $candidatePath -PathType Container) {
            return (Resolve-Path -LiteralPath $candidatePath).Path
        }
    }

    throw "No se encontro carpeta 'native' ni 'native-capture' dentro de: $resolvedPath"
}

$resolvedPluginRoot = (Resolve-Path -LiteralPath $PluginRoot).Path
$resolvedSource = Resolve-CaptureDependencySource -Path $DependencySource
$targetPath = Join-Path $resolvedPluginRoot $TargetRelativePath
$targetParent = Split-Path -Parent $targetPath

if (-not (Test-Path -LiteralPath $targetParent -PathType Container)) {
    New-Item -ItemType Directory -Path $targetParent -Force | Out-Null
}

if ($resolvedSource -eq $targetPath) {
    [pscustomobject]@{
        status = 'already_prepared'
        source = $resolvedSource
        target = $targetPath
        plugin_root = $resolvedPluginRoot
    }
    exit 0
}

if (Test-Path -LiteralPath $targetPath -PathType Container) {
    if (-not $Force) {
        throw "La ruta destino ya existe: $targetPath. Usa -Force si quieres reemplazarla."
    }

    if ($PSCmdlet.ShouldProcess($targetPath, 'Eliminar destino anterior')) {
        Remove-Item -LiteralPath $targetPath -Recurse -Force
    }
}

if ($PSCmdlet.ShouldProcess("$resolvedSource -> $targetPath", 'Preparar dependencia legacy de captura')) {
    Move-Item -LiteralPath $resolvedSource -Destination $targetPath
}

[pscustomobject]@{
    status = 'prepared'
    source = $resolvedSource
    target = $targetPath
    plugin_root = $resolvedPluginRoot
}